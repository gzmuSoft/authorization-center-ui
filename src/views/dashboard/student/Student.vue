<template lang="pug">
  v-card.student.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.student')", :info="info")
    v-card-text
      v-slide-group(v-model="classIndex", show-arrows)
        v-slide-item(v-for="c in classes", :key="c.id", mandatory, v-slot:default="{ active, toggle }")
          v-btn.mx-2(:input-value="active", active-class="secondary", depressed, rounded, @click="toggle")
            | {{c.name}}
      v-row
        v-col(cols="12", md="6")
          v-text-field(v-model="search.name", ref="name", :label="$t('entity.student.name')",
            counter="18", :rules="[maxLength(18)]", clearable)
        v-col(cols="12", md="6")
          v-text-field(v-model="search.no", ref="no", :label="$t('entity.student.no')",
            counter="18", :rules="[maxLength(18)]", clearable)
        v-subheader(v-if="searchStudent.length === 0") {{$t('tip.noData')}}
        v-col(v-for="student in searchStudent", :key="`${student.name}-${student.no}`", cols="12", sm="6" md="4", lg="3", xl="2")
          v-card.mx-auto.mb-1(max-width="344", ripple, shaped, :loading="loading", @click="handleView(student)")
            v-list-item(two-line)
              v-list-item-avatar
                v-avatar(:color="student.gender === '男' ? 'blue' : 'red'")
                  img(v-if="student.image !== null", :src="student.image", v-img-view)
                  span.headline.white--text(v-else) {{student.name.substring(0, 1)}}
              v-list-item-content
                .overline.mb-1 {{student.no}}
                  v-icon(small) {{genderIcon(student.gender)}}
                v-list-item-title.headline.mb-1 {{student.name}}
      student-view(ref="view", :item="view", @update="handleUpdate")
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import CardHeader from '@/components/CardHeader.vue'
import { studentPage } from '@/api/page'
import StudentView from './StudentView.vue'

@Component({ components: { CardHeader, StudentView } })
export default class Student extends Mixins(FormValidateMixin) {
  protected info = ''
  protected classIndex = -1
  protected students = []
  protected classes = []
  protected search = { name: '', no: '' }
  protected loading = false
  protected view = {}
  $refs: {
    form: any,
    view: any
  }
  created () {
    this.getData(null)
  }
  get searchStudent () {
    return this.students.filter(v => v.name.indexOf(this.search.name) > -1 && v.no.indexOf(this.search.no) > -1)
  }
  @Watch('classIndex')
  classChange (val) {
    if (typeof (this.classes[val]) !== 'undefined') { this.getData(this.classes[val].id) }
  }
  genderIcon (gender) {
    return gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }
  handleView (student) {
    if (!student.view) return
    this.view = student
    this.$refs.view.show = true
  }
  getData (classId) {
    this.loading = true
    studentPage({ classId }).then(res => {
      this.info = res.data.info
      if (res.data.hasOwnProperty('students')) {
        this.students = res.data.students
      }
      if (res.data.hasOwnProperty('classes')) {
        this.classes = res.data.classes
        if (this.classIndex === -1 && this.classes.length > 0) {
          this.classIndex = 0
          this.getData(this.classes[this.classIndex].id)
        }
      }
    }).finally(() => { this.loading = false })
  }
  handleUpdate (item) {
    this.view = item
    const index = this._.findIndex(this.students, { id: item.id })
    this.students.splice(index, 1, item)
  }
}
</script>

<style lang="stylus" scoped>

</style>
