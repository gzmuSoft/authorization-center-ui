<template lang="pug">
  v-card.teacher-admin.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.teacherManagement')")
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(xs12, sm6, md3, lg2)
            v-text-field(v-model="search.name", ref="name", :label="$t('entity.student.name')",
              counter="18", :rules="[maxLength(18)]", clearable)
          v-flex(xs12, sm6, md3, lg2)
            v-select(v-model="search.gender", ref="gender", :label="$t('entity.student.gender')", :items="gender",
              :append-icon="genderIcon", clearable)
          v-flex(xs12, sm6, md3, lg2)
            v-select(v-model="search.nation", ref="nation", :label="$t('entity.teacher.nation')",
              :items="types['9']", item-text="name", item-value="id", clearable)
          v-flex(xs12, sm6, md3, lg2)
            date-menu(v-model="search.workDate", ref="workDate", :label="$t('entity.teacher.workDate')", clearable)
          v-flex(xs12, sm6, md3, lg2)
            v-select(v-model="search.academic", :items="types['6']", item-text="name", item-value="id",
              :label="$t('entity.student.academic')", clearable)
          v-flex(xs12, sm6, md3, lg2)
            v-select(v-model="search.degree", :items="types['7']", item-text="name", item-value="id",
              :label="$t('entity.teacher.degree')", clearable)
          v-flex(xs12, sm6, md3, lg2)
            v-select(v-model="search.profTitle", :items="types['11']", item-text="name", item-value="id",
              :label="$t('entity.teacher.profTitle')", clearable)
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
        template(v-slot:item.degree="{ item }")
          span {{getDegree(item.degree)}}
        template(v-slot:item.profTitle="{ item }")
          span {{getProfessionalTitle(item.profTitle)}}
        template(v-slot:item.dep="{ item }")
          span {{getDep(item.dep)}}
        template(v-slot:item.academic="{ item }")
          span {{getAcademic(item.academic)}}
        template(v-slot:item.isEnable="{ item }")
          v-switch(:loading="item.loading", :disabled="item.disabled", v-model="item.isEnable",
            :true-value="true", :false-value="false", :value="item.isEnable", @click.stop="handleStatus(item)",
            :label="`${item.disabled === true? $t('action.wait') : item.isEnable ? $t('action.enable') : $t('action.disable') }`")
    teacher-admin-view(ref="view", :item="viewItem", @update="handleUpdate", @create="handleSearch")
    table-admin-user-view(ref="user", :item="viewItem")
    teacher-admin-import(ref="import")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import TableAdminMixin from '@/plugins/TableAdminMixin'
import DateMenu from '@/components/DateMenu.vue'
import { teacherAdminPage } from '@/api/page'
import TableAdminUserView from '@/components/TableAdminUserView.vue'
import TeacherAdminView from './TeacherAdminView.vue'
import TeacherAdminImport from '@/views/dashboard/teacher-admin/TeacherAdminImport.vue'

@Component({ components: { TeacherAdminImport, TeacherAdminView, TableAdminUserView, DateMenu, CardHeader } })
export default class TeacherAdmin extends Mixins(FormValidateMixin, TableAdminMixin) {
  get headers () {
    return [
      { text: this.$t('entity.student.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.student.gender'), align: 'left', value: 'gender' },
      { text: this.$t('entity.teacher.nation'), align: 'left', value: 'nation' },
      { text: this.$t('entity.teacher.workDate'), align: 'left', value: 'workDate' },
      { text: this.$t('entity.student.dep'), align: 'left', value: 'dep' },
      { text: this.$t('entity.student.academic'), align: 'left', value: 'academic' },
      { text: this.$t('entity.teacher.degree'), align: 'left', value: 'degree' },
      { text: this.$t('entity.teacher.profTitle'), align: 'left', value: 'profTitle' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.isEnable'), value: 'isEnable' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '180px' }
    ]
  }
  created () {
    this.getTypes()
    this.handleReset()
  }
  getPage (option) {
    this.load = true
    teacherAdminPage(option).then(res => {
      this.pageRes(res)
    }).finally(() => {
      this.load = false
    })
  }
  getDegree (id) {
    const degree = this.types['7']
    const find = this._.find(degree, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  getProfessionalTitle (id) {
    const professionalTitle = this.types['11']
    const find = this._.find(professionalTitle, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
}
</script>

<style lang="stylus" scoped>

</style>
