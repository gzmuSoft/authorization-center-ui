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
        v-col(v-for="student in students", :key="`${student.name}-${student.no}`", cols="12", sm="6" md="4", lg="3", xl="2")
          v-card.mx-auto.mb-1(max-width="344", ripple, shaped, :loading="loading")
            v-list-item(two-line)
              v-list-item-avatar
                v-avatar(color="secondary")
                  img(v-if="student.image !== null", :src="student.image", v-img-view)
                  span.headline.white--text(v-else) {{student.name.substring(0, 1)}}
              v-list-item-content
                .overline.mb-1 {{student.no}}
                v-list-item-title.headline.mb-1 {{student.name}}
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import CardHeader from '@/components/CardHeader.vue'
import { studentPage } from '@/api/page'
@Component({ components: { CardHeader } })
export default class Student extends Mixins(FormValidateMixin) {
  protected info = ''
  protected classIndex = -1
  protected students = []
  protected classes = []
  protected loading = false
  created () {
    this.getData(null)
  }
  @Watch('classIndex')
  classChange (val) {
    this.getData(this.classes[val].id)
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
}
</script>

<style lang="stylus" scoped>

</style>
