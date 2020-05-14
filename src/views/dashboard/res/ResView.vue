<template lang="pug">
  v-dialog.res-view(v-model="show", max-width="900px")
    v-card(:loading="loading")
      v-card-title
        span {{$t("title.info")}}
        v-spacer
        v-tooltip(bottom)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-alert(dark, border="left", color="indigo", dismissible)
          ul
            li 菜单资源——前端菜单，名称为路由名称，路径为菜单名称，备注为菜单头。
            li 请求资源——请求控制，名称、备注为空。
            li 功能资源——前端路由，没有在菜单上，名称为路由名称，备注为空。
            li 资源控制——资源操作，名称为资源描述，备注资源英文、方法为资源操作方式。
        v-form(ref="form")
          v-row
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.name", :label="$t('entity.base.name')", counter="30",
                autofocus, single-line, :rules="[maxLength(30)]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.url", :label="$t('entity.res.url')", counter="30",
                single-line, :rules="[maxLength(30)]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.describe", :label="$t('entity.res.describe')", counter="30",
                single-line, :rules="[required('entity.res.describe'), maxLength(30)]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.method", :label="$t('entity.res.method')", counter="30",
                single-line, :rules="[required('entity.res.method'), maxLength(30)]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.remark", :label="$t('entity.base.remark')", counter="30",
                single-line, :rules="[maxLength(30)]")
            v-col.pt-8.pb-0(cols="12", sm="6")
              v-slider(v-model="res.sort", :thumb-size="24", thumb-label)
                template(v-slot:prepend)
                  span(style="width:40px") {{$t('entity.base.sort')}}
                template(v-slot:append)
                  v-text-field.mt-0.pa-0(v-model="res.sort", single-line, type="number",
                    style="width:60px", :rules="[required('entity.base.sort')]")
            v-col(cols="12", sm="6", v-if="res.id !== null")
              v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
            v-col(cols="12", sm="6", v-if="res.id !== null")
              v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
      v-card-actions
        v-spacer
        v-btn.mr-2(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
        v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t('action.save')}}
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import { resCreate, resUpdate } from '@/api/res'

@Component
export default class ResView extends Mixins(FormValidateMixin, DialogViewMixin) {
  async handleSave () {
    if (!this.$refs.form.validate()) return
    this.loading = true
    try {
      if (this.res.id === null) {
        await resCreate(this.res)
        this.$emit('create', this.res)
      } else {
        await resUpdate(this.res)
        this.$emit('update', this.res)
      }
      this.show = false
      this.$toast.success(this.$t('tip.success'))
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
