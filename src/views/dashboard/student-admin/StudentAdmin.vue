<template lang="pug">
  v-card.student-admin.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.studentManagement')")
    v-card-text
      skeleton-table(:init="init", :sm="6", :md="3", :lg="2", :num="12")
        v-form(ref="form")
          v-layout(wrap, style="width:100%")
            v-flex(xs12, sm6, md3, lg2)
              v-text-field(v-model="search.name", ref="name", :label="$t('entity.student.name')",
                counter="18", :rules="[maxLength(18)]", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-text-field(v-model="search.no", ref="no", :label="$t('entity.student.no')",
                counter="18", :rules="[maxLength(18)]", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.gender", ref="gender", :label="$t('entity.student.gender')", :items="gender",
                :append-icon="genderIcon", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.nation", ref="nation", :label="$t('entity.teacher.nation')",
                :items="types['9']", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              date-menu(v-model="search.enterDate", ref="enterDate", :label="$t('entity.student.enterDate')", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.academic", :items="types['6']", item-text="name", item-value="id",
                :label="$t('entity.student.academic')", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.schoolId", ref="school", :label="$t('entity.student.school')",
                :items="types['0']", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.collegeId", ref="college", :label="$t('entity.student.college')",
                :items="colleges", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.depId", ref="dep", :label="$t('entity.student.dep')",
                :items="departments", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.specialtyId", ref="specialty", :label="$t('entity.student.specialty')",
                :items="specialty", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.classesId", ref="classes", :label="$t('entity.student.classes')",
                :items="classes", item-text="name", item-value="id", clearable)
            v-flex(xs12, sm6, md3, lg2)
              v-select(v-model="search.isEnable", ref="isEnable", :label="$t('entity.base.isEnable')",
                :items="status", item-text="name", item-value="value", clearable)
            v-flex.text-right(sm12)
              v-btn.mr-4(outlined, color="accent", @click="handleImport", v-if="permission.import") {{$t('action.import')}}
              v-btn.mr-4(outlined, color="success", @click="handleAdd", v-if="permission.add") {{$t('action.add')}}
              v-btn.mr-4(outlined, color="warning", @click="handleReset") {{$t('action.reset')}}
              v-btn(outlined, color="primary", @click="handleSearch") {{$t('action.search')}}
        v-data-table(:headers="headers", :items="items", :options.sync="options", :server-items-length="itemsLength",
          :footer-props="footer", :loading="load", multi-sort)
          template(v-slot:item.action="{ item }")
            v-tooltip(top, v-if="item.edit")
              template(v-slot:activator="{ on }")
                v-btn.mr-2(icon, x-small, fab, color="secondary", v-on="on", @click="handleView(item)")
                  v-icon mdi-pencil
              span {{$t('tip.baseInfo')}}
            v-tooltip(top, v-if="item.userView")
              template(v-slot:activator="{ on }")
                v-btn.mr-2(icon, x-small, fab, color="third", v-on="on", @click="handleUser(item)", :loading="item.user")
                  v-icon mdi-account
              span {{$t('tip.userInfo')}}
            v-tooltip(top, v-if="item.resetPassword")
              template(v-slot:activator="{ on }")
                v-btn.mr-2(icon, x-small, fab, color="warning", v-on="on", @click="handleResetPassword(item)")
                  v-icon mdi-lock-reset
              span {{$t('tip.resetPassword')}}
          template(v-slot:item.nation="{ item }")
            span {{getNation(item.nation)}}
          template(v-slot:item.classesId="{ item }")
            span {{getClass(item.classesId)}}
          template(v-slot:item.academic="{ item }")
            span {{getAcademic(item.academic)}}
          template(v-slot:item.isEnable="{ item }")
            v-switch(:loading="item.loading", :disabled="item.disabled", v-model="item.isEnable",
              :true-value="true", :false-value="false", :value="item.isEnable", @click.stop="handleStatus(item)",
              :label="`${item.disabled === true? $t('action.wait') : item.isEnable ? $t('action.enable') : $t('action.disable') }`")
    student-admin-view(ref="view", :item="viewItem", @update="handleUpdate", @create="handleSearch")
    table-admin-user-view(ref="user", :item="viewItem")
    student-admin-import(ref="import")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import TableAdminMixin from '@/plugins/TableAdminMixin'
import DateMenu from '@/components/DateMenu.vue'
import { studentAdminPage } from '@/api/page'
import { studentPatch } from '@/api/student'
import StudentAdminView from './StudentAdminView.vue'
import TableAdminUserView from '@/components/TableAdminUserView.vue'
import StudentAdminImport from './StudentAdminImport.vue'
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable.vue'

@Component({ components: { SkeletonTable, TableAdminUserView, StudentAdminImport, StudentAdminUserView: TableAdminUserView, StudentAdminView, DateMenu, CardHeader } })
export default class StudentAdmin extends Mixins(FormValidateMixin, TableAdminMixin) {
  protected init = true
  get headers () {
    return [
      { text: this.$t('entity.student.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.student.no'), align: 'left', value: 'no' },
      { text: this.$t('entity.student.gender'), align: 'left', value: 'gender' },
      { text: this.$t('entity.student.enterDate'), align: 'left', value: 'enterDate' },
      { text: this.$t('entity.student.academic'), align: 'left', value: 'academic' },
      { text: this.$t('entity.teacher.nation'), align: 'left', value: 'nation' },
      { text: this.$t('entity.student.classes'), align: 'left', value: 'classesId' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.isEnable'), value: 'isEnable' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '180px' }
    ]
  }
  async created () {
    await this.getTypes()
    this.handleReset()
    setTimeout(() => {
      this.init = false
    }, 3000)
  }
  getPage (option) {
    this.load = true
    studentAdminPage(option).then(res => {
      this.pageRes(res)
    }).finally(() => {
      this.load = false
    })
  }
  handleStatus (item) {
    item.loading = 'success'
    item.disabled = true
    item.isEnable = !item.isEnable
    studentPatch(item)
      .catch(() => { item.isEnable = !item.isEnable })
      .finally(() => {
        item.disabled = false
        item.loading = false
      })
  }
}
</script>

<style lang="stylus" scoped>

</style>
