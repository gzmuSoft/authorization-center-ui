<template lang="pug">
  v-card.student-admin.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.studentManagement')")
    v-card-text
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
            v-btn.mr-4(outlined, color="warning", @click="handleReset") {{$t('action.reset')}}
            v-btn.mr-4(outlined, color="success", @click="handleAdd") {{$t('action.add')}}
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
          v-tooltip(top, v-if="item.userEdit")
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="warning", v-on="on", @click="handleResetPassword(item)")
                v-icon mdi-lock-reset
            span {{$t('tip.resetPassword')}}
        template(v-slot:item.nation="{ item }")
          span {{getNation(item.nation)}}
        template(v-slot:item.classesId="{ item }")
          span {{getClass(item.classesId)}}
        template(v-slot:item.isEnable="{ item }")
          v-switch(:loading="item.loading", :disabled="item.disabled", v-model="item.isEnable",
            :true-value="true", :false-value="false", :value="item.isEnable", @click.stop="handleStatus(item)",
            :label="`${item.disabled === true? $t('action.wait') : item.isEnable ? $t('action.enable') : $t('action.disable') }`")
    student-admin-view(ref="view", :item="viewItem", @update="handleUpdate")
    student-admin-user-view(ref="user", :item="viewItem")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import TableMixin from '@/plugins/TableMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import StudentAdminMixin from './StudentAdminMixin'
import DateMenu from '@/components/DateMenu.vue'
import { studentAdminPage } from '@/api/page'
import { studentPatch } from '@/api/student'
import { Action } from 'vuex-class'
import StudentAdminView from './StudentAdminView.vue'
import StudentAdminUserView from './StudentAdminUserView.vue'
import { userOne } from '@/api/user'

@Component({ components: { StudentAdminUserView, StudentAdminView, DateMenu, CardHeader } })
export default class StudentAdmin extends Mixins(TableMixin, FormValidateMixin, StudentAdminMixin) {
  $refs : { form: any, view: any, user: any }
  protected search: any = {}
  @Action('getTypes', { namespace: 'admin' }) protected getTypes !: Function
  get userId () {
    if (this.viewItem.hasOwnProperty('userId')) return this.viewItem.userId
    else return 0
  }
  get colleges () {
    if (this.search.schoolId !== '') {
      const college: Array<any> = this.types['1']
      return this._.filter(college, { parentId: this.search.schoolId })
    } else {
      return []
    }
  }
  get departments () {
    if (this.search.collegeId !== '') {
      const department: Array<any> = this.types['2']
      return this._.filter(department, { parentId: this.search.collegeId })
    } else {
      return []
    }
  }
  get specialty () {
    if (this.search.depId !== '') {
      const specialty: Array<any> = this.types['3']
      return this._.filter(specialty, { parentId: this.search.depId })
    } else {
      return []
    }
  }
  get classes () {
    if (this.search.specialtyId !== '') {
      const classes: Array<any> = this.types['4']
      return this._.filter(classes, { parentId: this.search.specialtyId })
    } else {
      return []
    }
  }
  get genderIcon () {
    if (this.search.gender === '') return 'mdi-menu-down'
    return this.search.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }
  get headers () {
    return [
      { text: this.$t('entity.student.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.student.no'), align: 'left', value: 'no' },
      { text: this.$t('entity.student.gender'), align: 'left', value: 'gender' },
      { text: this.$t('entity.student.enterDate'), align: 'left', value: 'enterDate' },
      { text: this.$t('entity.teacher.nation'), align: 'left', value: 'nation' },
      { text: this.$t('entity.student.classes'), align: 'left', value: 'classesId' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.isEnable'), value: 'isEnable' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '180px' }
    ]
  }
  created () {
    this.getTypes()
    this.handleReset()
  }
  handleReset () {
    this.search = { name: '', no: '', schoolId: null, collegeId: null, depId: null, enterDate: null, specialtyId: null, classesId: null, gender: null, nation: null, isEnable: true }
  }
  getPage (option) {
    this.load = true
    studentAdminPage(option).then(res => {
      this.items = []
      res.data.content.forEach(v => {
        v.loading = false
        v.disabled = false
        v.user = false
        this.items.push(v)
      })
      this.itemsLength = res.data.itemsLength
    }).finally(() => {
      this.load = false
    })
  }
  getNation (id) {
    const nations = this.types['9']
    const find = this._.find(nations, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  getClass (id) {
    const classes = this.types['4']
    const find = this._.find(classes, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
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
  handleUser (item) {
    item.user = true
    userOne(item.userId).then(res => {
      this.viewItem = res.data
      this.viewItem.userEdit = item.userEdit
      this.$refs.user.show = true
    }).finally(() => {
      item.user = false
    })
  }
  handleResetPassword (item) {
    //
  }
}
</script>

<style lang="stylus" scoped>

</style>
