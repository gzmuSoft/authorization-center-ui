<template lang="pug">
  v-dialog.res-view(v-model="show", max-width="900px")
    v-card(:loading="loading")
      v-card-title
        span {{$t("title.info")}}
        v-spacer
        v-tooltip(left)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-row
          v-col(cols="12", sm="6")
            v-text-field(v-model="res.name", :label="$t('entity.res.name')", counter="30",
              autofocus, single-line, :rules="[maxLength(30)]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="res.url", :label="$t('entity.res.url')", counter="30",
              autofocus, single-line, :rules="[maxLength(30)]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="res.describe", :label="$t('entity.res.describe')", counter="30",
              autofocus, single-line, :rules="[required('entity.res.describe'), maxLength(30)]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="res.method", :label="$t('entity.res.method')", counter="30",
              autofocus, single-line, :rules="[required('entity.res.method'), maxLength(30)]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="res.remark", :label="$t('entity.res.remark')", counter="30",
              autofocus, single-line, :rules="[maxLength(30)]")
          v-col.pt-8.pb-0(cols="12", sm="6")
            v-slider(v-model="res.sort", :thumb-size="24", thumb-label)
              template(v-slot:prepend)
                span(style="width:40px") {{$t('entity.base.sort')}}
              template(v-slot:append)
                v-text-field.mt-0.pa-0(v-model="res.sort", single-line, type="number", style="width:60px")
          v-col(cols="12", sm="6")
            v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
          v-col(cols="12", sm="6")
            v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
      v-card-actions
        v-spacer
        v-btn.mr-2(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
        v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t('action.save')}}
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { resTypes } from '@/utils/options'
import { resUpdate } from '@/api/res'

@Component
export default class ResView extends Mixins(FormValidateMixin) {
  @Prop(Object) protected item !: object
  private show: boolean = false
  private res: object = {}
  private loading = false
  created () {
    this.res = this.item
  }
  @Watch('item')
  keep (val) {
    this.res = this._.cloneDeep(val)
  }
  handleReset () {
    this.res = this._.cloneDeep(this.item)
  }
  handleSave () {
    this.loading = true
    resUpdate(this.res).then(() => {
      this.$emit('update', this.res)
      this.show = false
      this.$toast.success(this.$t('tip.success'))
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
