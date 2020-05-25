<template lang="pug">
  .role-view
    .grey--text.text--lighten-1.font-weight-light {{$t("tip.role.edit")}}
    v-form(ref="form")
      v-simple-table
        tbody
          tr
            td {{$t('entity.base.name')}}
            td
              v-edit-dialog(:return-value.sync="role.name", large, :cancel-text="$t('action.cancel')",
                :save-text="$t('action.save')") {{role.name}}
                template(v-slot:input)
                  v-text-field(v-model="role.name", :label="$t('entity.base.name')", counter="30",
                    autofocus, single-line, :rules="[required('entity.base.name'), maxLength(30)]")
          tr
            td {{$t('entity.role.des')}}
            td
              v-edit-dialog(:return-value.sync="role.des", large :cancel-text="$t('action.cancel')",
                :save-text="$t('action.save')") {{role.des}}
                template(v-slot:input)
                  v-text-field(v-model="role.des", :label="$t('entity.role.des')", counter="30",
                    autofocus, single-line, :rules="[maxLength(30)]")
          tr
            td {{$t('entity.role.iconCls')}}
            td
              v-edit-dialog(:return-value.sync="role.iconCls", large, :cancel-text="$t('action.cancel')",
                :save-text="$t('action.save')") {{role.iconCls}}
                template(v-slot:input)
                  v-text-field(v-model="role.iconCls", :label="$t('entity.role.iconCls')", counter="30",
                    autofocus, single-line, :rules="[required('entity.role.iconCls'), maxLength(30)]")
          tr
            td {{$t('entity.base.sort')}}
            td
              v-edit-dialog(:return-value.sync="role.sort", large, :cancel-text="$t('action.cancel')",
                :save-text="$t('action.save')") {{role.sort}}
                template(v-slot:input)
                  v-text-field(v-model="role.sort", :label="$t('entity.base.sort')", type="number",
                    autofocus, single-line, :rules="[required('entity.base.sort')]")
          tr
            td {{$t("entity.base.createUser")}}
            td {{role.createUser}}
          tr
            td {{$t("entity.base.createTime")}}
            td {{role.createTime}}
          tr
            td {{$t("entity.base.modifyUser")}}
            td {{role.modifyUser}}
          tr
            td {{$t("entity.base.modifyTime")}}
            td {{role.modifyTime}}
          tr
            td {{$t("entity.base.isEnable")}}
            td
              v-switch(v-model="role.isEnable", :label="$t(`tip.${role.isEnable ?'yes':'no'}`)")
          tr
            td {{$t("entity.base.remark")}}
            td
              v-edit-dialog(:return-value.sync="role.remark", large,
                :cancel-text="$t('action.cancel')", :save-text="$t('action.save')") {{role.remark}}
                template(v-slot:input)
                  v-text-field(v-model="role.remark", :label="$t('entity.base.remark')", counter="200",
                    autofocus, single-line, :rules="[maxLength(200)]")
    .text-right
      //v-btn(color="primary", outlined, @click="handleAdd") {{$t("action.addChildren")}}
      v-btn.ml-4(color="warning", outlined, @click="handleReset") {{$t("action.reset")}}
      v-btn.ml-4(color="success", outlined, @click="handleSave", v-show="change", :loading="loading.save") {{$t("action.save")}}
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { roleAdd, roleUpdate } from '@/api/role'

@Component
export default class RoleView extends Mixins(FormValidateMixin) {
  @Prop({ type: Object }) default!: Object
  private role = null
  private loading = { delete: false, save: false }

  created () {
    this.role = this._.cloneDeep(this.default)
  }

  @Watch('default')
  roleChange (val) {
    this.role = this._.cloneDeep(val)
  }

  get change () {
    return !this._.isEqual(this.role, this.default)
  }

  async handleSave () {
    if (!this.$refs.form.validate()) {
      this.$toast.warning(this.$t('tip.validate.complete'))
      return
    }
    this.loading.save = true
    try {
      if (this.role.id === null) {
        await roleUpdate(this.role)
      } else {
        await roleAdd(this.role)
      }
      this.$toast.success(this.$t('tip.success'))
      this.$emit('success', this.role)
    } finally {
      this.loading.save = false
    }
  }
  handleReset () {
    this.role = this._.cloneDeep(this.default)
  }
  handleAdd () {
    this.$emit('add')
  }
}
</script>

<style lang="stylus" scoped>

</style>
