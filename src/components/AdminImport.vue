<template lang="pug">
  v-card.admin-import
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
          v-btn(icon, v-on="on", @click="handleSuccess")
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
          v-radio-group(v-model="advanced")
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
            v-form.second(ref="form", v-show="advanced")
              v-divider
              v-radio-group(v-model="update")
                template(v-slot:label)
                  .config {{$t('tip.import.exist')}}
                v-radio(:value="false")
                  template(v-slot:label)
                    .config-one 直接跳过，对已有的数据
                      strong.error--text 不进行任何操作
                      span.grey--text (例: 存在 201607090217 学生，导入数据中有学号相同学生将直接跳过)
                v-radio(:value="true")
                  template(v-slot:label)
                    .config-two 替换数据，使用新的数据
                      strong.success--text 完全替换并启用
                      span.grey--text (例: 存在 201607090217 学生，导入数据中有学号相同学生将直接覆盖旧数据并启用)
              slot(name="advanced")
          v-btn.mr-2(color="secondary", @click="handleSecond", :loading="loading.second") {{$t('action.next')}}
          v-btn(color="secondary", @click="handlePrevious") {{$t('action.previous')}}
        v-stepper-step(step="3", color="secondary") {{$t('tip.import.third')}}
        v-stepper-content(step="3")
          slot(name="preview")
          v-btn.mr-2(color="secondary", @click="handleThird(false)", :loading="loading.third", :disabled="loading.third") {{$t('action.next')}}
            template(v-slot:loader)
              span {{loading.thirdTip}}
          v-btn(color="secondary", @click="handlePrevious") {{$t('action.previous')}}
        v-stepper-step(step="4", color="secondary") {{$t('tip.import.fourth')}}
        v-stepper-content(step="4")
          v-btn(color="secondary", @click="handleSuccess") {{$t('action.finished')}}
    v-dialog(v-model="tip.show", width="500px")
      v-card
        v-card-title.headline.grey.lighten-2(primary-title) {{$t('title.tip')}}
        v-card-text
          p {{$t('tip.import.existContent', [update ? '替换' : '不进行任何'])}}
          ul
            li(v-for="no in tip.no") {{no}}
        v-card-actions
          v-spacer
          v-btn(outlined, color="error", @click="tip.show = false") {{$t('action.cancel')}}
          v-btn(outlined, color="success", @click="handleThird(true)") {{$t('action.ok')}}
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import StudentAdminPreview from '../views/dashboard/student-admin/StudentAdminPreview.vue'

@Component({ components: { StudentAdminPreview } })
export default class StudentAdminImport extends Mixins(FormValidateMixin) {
  $refs: { form: any, files: any }
  @Prop(Function) protected second !: Function
  @Prop(Function) protected validate !: Function
  @Prop(Function) protected import !: Function
  protected loading = { second: false, third: false, thirdTip: '' }
  protected tip = { show: false, no: [] }
  protected help = true
  protected files = []
  protected step = 1
  protected update = false
  protected advanced = false
  protected panel = [0, 1]
  protected rules = [
    '导入的文件应该与 <a>模板文件</a> 保持一致，否则请使用 <b>高级配置</b>。',
    '仅支持导入 <b>xls</b> 与 <b>xlsx</b> 格式的 EXCEL 表格文件。',
    '当文件存在多个工作薄(sheet)时，会逐一导入。',
    '首行应该直接为表头信息，如果不是，需要使用 <b>高级配置</b>。',
    '导入前建议保证数据的 <b>完整性</b>，如果导入的数据中存在数据缺失情况，可能会造成导入失败的情况发生。',
    '由于导入的过程涉及过程较为复杂，在导入过得过程中请不要擅自关闭此页面，否则可能造成导入的数据错乱等问题。',
    '导入后，<b>学号将作为用户的账户名称，学号后六位将作为默认密码。因此，学号为必填项且长度必须大于等于 6！</b>',
    '为了保证导入能够正常进行，学号长度小于 6 位时，默认密码为 000000.'
  ]
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
    try {
      await this.second(this.files)
      this.step = 3
    } catch (e) {
      this.$toast.error(this.$t('tip.import.error'))
    } finally {
      this.loading.second = false
    }
  }
  async handleThird (tip) {
    this.tip.show = false
    this.loading.third = true
    try {
      this.loading.thirdTip = this.$t('tip.import.validate') as string
      const params = await this.validate(tip, this.update)
      if (params === null && !tip) return
      this.loading.thirdTip = this.$t('tip.import.loading') as string
      await this.import(params)
      this.step = 4
    } catch (e) {
      if (e === false) return
      this.$toast.warning(this.$t('tip.import.error'))
    } finally {
      this.loading.third = false
    }
  }
  handleSuccess () {
    this.$emit('success')
    this.files = []
    this.step = 1
  }
  handlePrevious () {
    this.step = this.step - 1
  }
}
</script>

<style lang="stylus" scoped>

</style>
