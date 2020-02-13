<template lang="pug">
  v-container.college-view
    v-form(ref="form")
      .grey--text.text--lighten-1.font-weight-light {{$t(`${item.id === null? 'action.add' : 'action.view' }`)}}
      v-row
        v-col(cols="12", md="6")
          v-text-field(v-model="college.name", :label="$t('entity.base.name')", counter="30",
            single-line, :rules="[required('entity.base.name'), maxLength(30)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="college.brief", :label="$t('entity.sysData.brief')", counter="30",
            single-line, :rules="[maxLength(30)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="college.sort", :label="$t('entity.base.sort')", counter="4",
            single-line, :rules="[max(100)]", type="number")
        v-col(cols="12", md="6")
          v-switch(v-model="college.isEnable", :label="isEnable")
        v-col(cols="12", md="6")
          v-text-field(:value="college.createTime", :label="$t('entity.base.createTime')", disabled)
        v-col(cols="12", md="6")
          v-text-field(:value="college.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
        v-col(cols="12")
          v-textarea(v-model="college.remark", :label="$t('entity.base.remark')", counter="128", rows="2",
            :rules="[maxLength(128)]")
        v-card-actions(style="width:100%")
          v-btn(color="secondary", outlined, v-if="item.type !== 4 && item.id !== null", @click="handleAdd") {{$t("action.addChildren")}}
          v-spacer
          v-btn(color="warning", outlined, @click="handleReset") {{$t("action.reset")}}
          v-btn.ml-4(color="success", outlined, @click="handleSave", v-if="item.id !== null", v-show="change", :loading="loading.save") {{$t("action.save")}}
          v-btn.ml-4(color="success", outlined, @click="handleSave", v-if="item.id === null", :loading="loading.save") {{$t("action.save")}}

</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { collegeCreate, collegeUpdate } from '@/api/college'

@Component
export default class CollegeView extends Mixins(FormValidateMixin) {
  @Prop({ type: Object }) item!: Object
  private college = null
  private loading = { save: false }
  created () {
    this.college = this._.cloneDeep(this.item)
  }
  @Watch('item')
  collegeChange () {
    this.handleReset()
  }
  get change () {
    return !this._.isEqual(this.college, this.item)
  }
  get isEnable () {
    return this.$t('entity.base.isEnable') + '：' + this.$t(`tip.${this.college.isEnable ? 'yes' : 'no'}`)
  }
  async handleSave () {
    this.loading.save = true
    if (!this.$refs.form.validate()) return
    try {
      if (this.college.id === null) {
        await collegeCreate(this.college)
      } else {
        await collegeUpdate(this.college)
      }
      this.$emit('success', this.college)
      this.$toast.success(this.$t('tip.success'))
    } finally {
      this.loading.save = false
    }
  }
  handleReset () {
    this.college = this._.cloneDeep(this.item)
    if (typeof (this.$refs.form) !== 'undefined') { this.$refs.form.resetValidation() }
  }
  handleAdd () {
    this.$emit('add', this.item)
  }
}
</script>

<style lang="stylus" scoped>

</style>
