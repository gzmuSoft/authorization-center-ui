<template lang="pug">
  .teacher-admin-preview
    v-row.mx-4
      p.font-weight-bold {{$t('tip.import.field')}}
      v-spacer
      v-btn(color="error", outlined, @click="handleDeleteSelected") {{$t('action.deleteSelect')}}
    v-data-table(v-model="selected", :headers="headers", item-key="idNumber"
      :items="data", :footer-props="footer", show-select)
      template(v-slot:item.school="{ item }")
        span(:class="item.schoolId ? '' : 'error--text font-weight-bold'") {{item.school}}
      template(v-slot:item.college="{ item }")
        span(:class="item.collegeId ? '' : 'error--text font-weight-bold'") {{item.college}}
      template(v-slot:item.dep="{ item }")
        span(:class="item.depId ? '' : 'error--text font-weight-bold'") {{item.dep}}
      template(v-slot:item.academicName="{ item }")
        span(:class="item.academic ? '' : 'error--text font-weight-bold'") {{item.academicName}}
      template(v-slot:item.nationName="{ item }")
        span(:class="item.nation ? '' : 'error--text font-weight-bold'") {{item.nationName}}
      template(v-slot:item.degreeName="{ item }")
        span(:class="item.degree ? '' : 'error--text font-weight-bold'") {{item.degreeName}}
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import AdminPreviewMixin from '@/plugins/AdminPreviewMixin'

@Component
export default class TeacherAdminPreview extends Mixins(AdminPreviewMixin) {
  get headers () {
    return [
      { text: this.$t('entity.student.name'), align: 'left', value: 'name', width: '90px' },
      { text: this.$t('entity.user.phone'), align: 'left', value: 'phone' },
      { text: this.$t('entity.student.idNumber'), align: 'left', value: 'idNumber' },
      { text: this.$t('entity.student.gender'), align: 'left', value: 'gender', width: '40px' },
      { text: this.$t('entity.student.birthday'), align: 'left', value: 'birthday', width: '100px' },
      { text: this.$t('entity.teacher.nation'), align: 'left', value: 'nationName' },
      { text: this.$t('entity.student.school'), align: 'left', value: 'school' },
      { text: this.$t('entity.student.college'), align: 'left', value: 'college' },
      { text: this.$t('entity.teacher.degree'), align: 'left', value: 'degreeName' },
      { text: this.$t('entity.student.academic'), align: 'left', value: 'academicName' },
      { text: this.$t('entity.teacher.profTitle'), align: 'left', value: 'profTitleName' },
      { text: this.$t('entity.student.originalMajor'), align: 'left', value: 'major' },
      { text: this.$t('entity.student.graduationDate'), align: 'left', value: 'graduationDate', width: '100px' },
      { text: this.$t('entity.student.graduateInstitution'), align: 'left', value: 'graduateInstitution', sortable: false },
      { text: this.$t('entity.student.remark'), align: 'left', value: 'remark', sortable: false }
    ]
  }
  protected handleData (tmp) {
    const school = this._.find(this.school, { name: tmp.school })
    if (typeof (school) !== 'undefined') tmp.schoolId = school.id
    else tmp.schoolId = null
    const college = this._.find(this.college, { name: tmp.college })
    if (typeof (college) !== 'undefined') tmp.collegeId = college.id
    else tmp.collegeId = null
    const dep = this._.find(this.dep, { name: tmp.dep })
    if (typeof (dep) !== 'undefined') tmp.depId = dep.id
    else tmp.depId = null
    tmp.academicName = tmp.academic
    const academic = this._.find(this.academic, { name: tmp.academic })
    if (typeof (academic) !== 'undefined') tmp.academic = academic.id
    else tmp.academic = null
    // nation
    tmp.nationName = tmp.nation
    const nation = this._.find(this.nation, { name: tmp.nation })
    if (typeof (nation) !== 'undefined') tmp.nation = nation.id
    else tmp.nation = null
    // degree
    tmp.degreeName = tmp.degree
    const degree = this._.find(this.degree, { name: tmp.nation })
    if (typeof (degree) !== 'undefined') tmp.degree = degree.id
    else tmp.degree = null
    // professionalTitle
    tmp.profTitleName = tmp.profTitle
    const profTitle = this._.find(this.professionalTitle, { name: tmp.profTitle })
    if (typeof (profTitle) !== 'undefined') tmp.profTitle = profTitle.id
    else tmp.profTitle = null
    return tmp
  }
}
</script>

<style lang="stylus" scoped>

</style>
