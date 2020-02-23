<template lang="pug">
  v-dialog.teacher-admin-import(v-model="show", fullscreen, hide-overlay, transition="dialog-bottom-transition", scrollable)
    admin-import(ref="import", :second="handleSecond", :validate="handleValidate", :import="handleImport", @success="show = false")
      template(v-slot:advanced)
        v-divider.mt-5
        v-text-field(v-model="config.start", :label="$t('tip.import.start')", type="number", color="secondary",
          :hint="$t('tip.import.startTip')", persistent-hint, :rules="[required('tip.this')]")
        v-subheader {{$t('tip.import.mapper')}}
        v-row(v-for="r in rows", :key="r.key")
          v-col(cols="5")
            v-text-field(:value="`${r.label} ${config[r.key]}`", color="secondary", disabled, readonly)
          v-col.text-center(cols="2")
            v-icon.mt-6 mdi-arrow-right-bold
          v-col(cols="5")
            v-text-field(v-model="config[r.key]", color="secondary", :rules="[required('tip.this')]", :label="`${r.label}列`")
      template(v-slot:preview)
        teacher-admin-preview(ref="preview", :config="config")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import AdminImport from '@/components/AdminImport.vue'
import TeacherAdminPreview from '@/views/dashboard/teacher-admin/TeacherAdminPreview.vue'
import ImportMixin from '@/plugins/ImportMixin'
import { teacherImport } from '@/api/teacher'
@Component({
  components: { TeacherAdminPreview, AdminImport }
})
export default class TeacherAdminImport extends Mixins(FormValidateMixin, ImportMixin) {
  $refs: { form: any, import: any, preview: any }
  protected show = false
  protected config = {
    start: 2,
    school: 'A',
    college: 'B',
    dep: 'C',
    name: 'D',
    gender: 'E',
    idNumber: 'F',
    phone: 'G',
    birthday: 'H',
    nation: 'I',
    degree: 'J',
    academic: 'K',
    graduationDate: 'L',
    major: 'M',
    graduateInstitution: 'N',
    profTitle: 'N',
    remark: 'O'
  }
  protected rows = [
    { key: 'school', label: '学校' },
    { key: 'college', label: '学院' },
    { key: 'dep', label: '系部' },
    { key: 'name', label: '姓名' },
    { key: 'gender', label: '性别' },
    { key: 'idNumber', label: '身份证号' },
    { key: 'phone', label: '手机号' },
    { key: 'birthday', label: '生日' },
    { key: 'nation', label: '民族' },
    { key: 'degree', label: '学位' },
    { key: 'academic', label: '最后学历' },
    { key: 'graduationDate', label: '最后学历毕业时间' },
    { key: 'major', label: '最后学历所学专业' },
    { key: 'graduateInstitution', label: '最后学历毕业院校' },
    { key: 'profTitle', label: '职称' },
    { key: 'remark', label: '备注' }
  ]

  async handleImport (params) {
    await teacherImport(params)
  }
}
</script>

<style lang="stylus" scoped>

</style>
