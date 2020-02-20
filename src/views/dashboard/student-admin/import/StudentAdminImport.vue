<template lang="pug">
  v-dialog.student-admin-import(v-model="show", fullscreen, hide-overlay, transition="dialog-bottom-transition", scrollable)
    v-card
      v-toolbar(flat, color="secondary", dark)
        v-toolbar-title {{$t("action.import")}}
        v-spacer
        v-tooltip(bottom)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="help = !help")
              v-icon mdi-help-circle-outline
          span {{$t("title.import")}}
        v-tooltip(bottom)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-alert.mt-6(v-model="help", text, color="secondary", dismissible, transition="scroll-y-transition")
          h3.title 导入规则
          ol.mt-3
            li(v-for="(rule, index) in rules", v-html="rule", :key="index")
        v-stepper(v-model="step", vertical)
          v-stepper-step(step="1", color="secondary") {{$t('tip.import.first')}}
          v-stepper-content(step="1")
            v-file-input(v-model="files", color="secondary", counter, show-size, small-chips, multiple,
              :label="$t('action.import')", accept=".xls,.xlsx", ref="files", :rules="[]")
              template(v-slot:selection="{ index, text }")
                v-chip(color="secondary", dark, label, small, close, @click:close="handleDelete(index)") {{ text }}
            v-btn.mr-2(color="secondary", @click="handleFirst") {{$t('action.next')}}
          v-stepper-step(step="2", color="secondary") {{$t('tip.import.second')}}
          v-stepper-content(step="2")
            v-radio-group(v-model="config.enable")
              template(v-slot:label)
                .config {{$t('title.import')}}
              v-radio(:value="false")
                template(v-slot:label)
                  .config-one 如果您导入的文件与我们的模板一致,请使用
                    strong.success--text 默认配置
              v-radio(:value="true")
                template(v-slot:label)
                  .config-two 如果您需要自定义导入模板,请使用
                    strong.primary--text 高级配置
            v-expand-transition
              v-form.second(ref="form", v-show="config.enable")
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
            v-btn.mr-2(color="secondary", @click="handleSecond", :loading="loading.second") {{$t('action.next')}}
            v-btn(color="secondary", @click="handlePrevious") {{$t('action.previous')}}
          v-stepper-step(step="3", color="secondary") {{$t('tip.import.third')}}
          v-stepper-content(step="3")
            student-admin-preview(ref="preview", :config="config")
            v-btn.mr-2(color="secondary", @click="handleThird", :loading="loading.third", :disabled="loading.third") {{$t('action.next')}}
              template(v-slot:loader)
                span {{loading.thirdTip}}
            v-btn(color="secondary", @click="handlePrevious") {{$t('action.previous')}}
          v-stepper-step(step="4", color="secondary") {{$t('tip.import.fourth')}}
          v-stepper-content(step="4")
            v-btn(color="secondary", @click="handleSuccess") {{$t('action.previous')}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import StudentAdminPreview from './StudentAdminPreview.vue'
import { userExist } from '@/api/user'
import { studentImport } from '@/api/student'

@Component({ components: { StudentAdminPreview } })
export default class StudentAdminImport extends Mixins(FormValidateMixin) {
  $refs: { form: any, files: any, preview: any }
  protected show = false
  protected loading = { second: false, third: false, thirdTip: '' }
  protected help = true
  protected files = []
  protected step = 4
  protected panel = [0, 1]
  protected rules = [
    '导入的文件应该与 <a>模板文件</a> 保持一致，否则请使用 <b>高级配置</b>。',
    '仅支持导入 <b>xls</b> 与 <b>xlsx</b> 格式的 EXCEL 表格文件。',
    '当文件存在多个工作薄(sheet)时，会逐一导入。',
    '首行应该直接为表头信息，如果不是，需要使用 <b>高级配置</b>。',
    '导入前建议保证数据的 <b>完整性</b>，如果导入的数据中存在数据缺失情况，可能会造成导入失败的情况发生。',
    '由于导入的过程涉及过程较为复杂，在导入过得过程中请不要擅自关闭此页面，否则可能造成导入的数据错乱等问题。',
    '导入后，<b>学号将作为用户的账户名称，学号后六位将作为默认密码。因此，学号为必填项且长度必须大于等于 6！</b>'
  ]
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
    remark: 'P'
  }
  handleDelete (index) {
    this.files.splice(index, 1)
  }
  handleFirst () {
    if (this.files.length === 0) {
      this.$toast.warning(this.$t('tip.import.noFiles'))
      return
    }
    this.step = 2
  }
  async handleSecond () {
    if (!this.$refs.form.validate()) {
      this.$toast.warning(this.$t('tip.validate.complete'))
      return
    }
    this.loading.second = true
    this.$refs.preview.data = []
    try {
      for (let file of this.files) {
        await this.$refs.preview.parseData(file)
      }
      this.step = 3
    } catch (e) {
      this.$toast.error(this.$t('tip.import.error'))
    } finally {
      this.loading.second = false
    }
  }
  async handleThird () {
    if (this.$refs.preview.data.length === 0) {
      this.$toast.error(this.$t('tip.import.noData'))
      return
    }
    this.loading.third = true
    try {
      this.loading.thirdTip = this.$t('tip.import.validate') as string
      const data = this.$refs.preview.data
      const params = { content: data, config: {} }
      const nos = data.map(d => d.no)
      const res = await userExist(nos)
      // Already exist users
      const users = res.data
      if (users.length !== 0) {
        const names = users.map(u => u.name)
        await this.$dialog
          .confirm(`学号为 ${names} 的用户已经存在，我们将会直接跳过。您确定继续吗？`)
      }
      this.loading.thirdTip = this.$t('tip.import.loading') as string
      await studentImport(params)
      this.step = 4
    } catch (e) {
      if (e === false) return
      this.$toast.warning(this.$t('tip.import.error'))
    } finally {
      this.loading.third = false
    }
  }
  handleSuccess () {
    this.show = false
    this.files = []
    this.step = 1
    this.$refs.preview.data = []
  }
  handlePrevious () {
    this.step = this.step - 1
  }
}
</script>

<style lang="stylus" scoped>

</style>
