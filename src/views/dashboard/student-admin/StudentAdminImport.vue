<template lang="pug">
  v-dialog.student-admin-import(v-model="show", fullscreen, hide-overlay, transition="dialog-bottom-transition", scrollable)
    admin-import(ref="import", :second="handleSecond", :validate="handleValidate", :import="handleImport", @success="show = false")
      template(v-slot:advanced)
        v-divider.mt-5
        v-text-field(v-model="config.start", :label="$t('tip.import.start')", type="number", color="secondary",
          :hint="$t('tip.import.startTip')", persistent-hint, :rules="[required('tip.this')]")
        v-subheader {{$t('tip.import.mapper')}}
        v-row
          v-col(cols="5")
            v-text-field(value="学校", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.school", color="secondary", :rules="[required('tip.this')]", label="学校列")
        v-row
          v-col(cols="5")
            v-text-field(value="学校", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.college", color="secondary", :rules="[required('tip.this')]", label="学院列")
        v-row
          v-col(cols="5")
            v-text-field(value="系部", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.dep", color="secondary", :rules="[required('tip.this')]", label="系部列")
        v-row
          v-col(cols="5")
            v-text-field(value="专业", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.specialty", color="secondary", :rules="[required('tip.this')]", label="专业列")
        v-row
          v-col(cols="5")
            v-text-field(value="班级", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.classes", color="secondary", :rules="[required('tip.this')]", label="班级列")
        v-row
          v-col(cols="5")
            v-text-field(value="学号", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.no", color="secondary", :rules="[required('tip.this')]", label="学号列")
        v-row
          v-col(cols="5")
            v-text-field(value="姓名", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.name", color="secondary", :rules="[required('tip.this')]", label="姓名列")
        v-row
          v-col(cols="5")
            v-text-field(value="性别", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.gender", color="secondary", :rules="[required('tip.this')]", label="性别列")
        v-row
          v-col(cols="5")
            v-text-field(value="身份证号码", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.idNumber", color="secondary", :rules="[required('tip.this')]", label="身份证号码列")
        v-row
          v-col(cols="5")
            v-text-field(value="出生日期", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.birthday", color="secondary", :rules="[required('tip.this')]", label="出生日期列")
        v-row
          v-col(cols="5")
            v-text-field(value="入校时间", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.enterDate", color="secondary", :rules="[required('tip.this')]", label="入校时间列")
        v-row
          v-col(cols="5")
            v-text-field(value="最后学历", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.academic", color="secondary", :rules="[required('tip.this')]", label="最后学历列")
        v-row
          v-col(cols="5")
            v-text-field(value="最后学历毕业时间", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.graduationDate", color="secondary", :rules="[required('tip.this')]", label="最后学历毕业时间列")
        v-row
          v-col(cols="5")
            v-text-field(value="最后学历所学专业", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.graduateInstitution", color="secondary", :rules="[required('tip.this')]", label="最后学历所学专业列")
        v-row
          v-col(cols="5")
            v-text-field(value="备注", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config.remark", color="secondary", :rules="[required('tip.this')]", label="备注列")
      template(v-slot:preview)
        student-admin-preview(ref="preview", :config="config")

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import AdminImport from '@/components/AdminImport.vue'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { userExist } from '@/api/user'
import { studentImport } from '@/api/student'
import StudentAdminPreview from './StudentAdminPreview.vue'

@Component({ components: { StudentAdminPreview, AdminImport } })
export default class StudentAdminImport extends Mixins(FormValidateMixin) {
  $refs: { form: any, import: any, preview: any }
  protected show = false
  protected config = {
    enable: false,
    start: 2,
    school: 'A',
    college: 'B',
    dep: 'C',
    specialty: 'D',
    classes: 'E',
    no: 'F',
    name: 'G',
    gender: 'H',
    nation: 'I',
    idNumber: 'J',
    birthday: 'K',
    enterDate: 'L',
    academic: 'M',
    graduationDate: 'N',
    graduateInstitution: 'O',
    remark: 'P',
    update: false
  }
  async handleSecond (files) {
    this.$refs.preview.data = []
    for (let file of files) {
      await this.$refs.preview.parseData(file)
    }
  }
  async handleValidate (tip, update) {
    if (this.$refs.preview.data.length === 0) {
      this.$toast.error(this.$t('tip.import.noData'))
      return null
    }
    const data = this.$refs.preview.data
    const nos = data.map(d => d.no)
    const res = await userExist(nos)
    // Already exist users
    const users = res.data
    if (users.length !== 0 && !tip) {
      const names = users.map(u => u.name)
      this.$refs.import.tip.show = true
      this.$refs.import.tip.no = names
      return null
    }
    return { content: data, config: { update: update } }
  }
  async handleImport (params) {
    await studentImport(params)
  }
}
</script>

<style lang="stylus" scoped>

</style>
