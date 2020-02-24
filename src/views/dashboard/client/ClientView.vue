<template lang="pug">
  v-sheet.clientView(tile)
    v-form(ref="form")
      v-row
        v-col(cols="12", md="6")
          v-text-field(v-model="res.name", ref="name", :label="$t('entity.client.name')",
            counter="18", :rules="[required('entity.student.name'), maxLength(18)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.resourceIds", ref="resourceIds", :label="$t('entity.client.resourceId')",
            :hint="$t('entity.client.tip.resource')", persistent-hint,
            counter="100", :rules="[required('entity.client.resourceId'), maxLength(100)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.clientId", ref="clientId", :label="$t('entity.client.clientId')",
            :hint="$t('entity.client.tip.client')", persistent-hint,
            counter="100", :rules="[required('entity.client.clientId'), maxLength(100)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.spell", ref="clientSecret", :label="$t('entity.client.clientSecret')",
            :hint="$t('entity.client.tip.clientSecret')", persistent-hint, readonly, append-icon="mdi-refresh",
            counter="100", :rules="[required('entity.client.clientSecret'), maxLength(100)]", @click:append="handleGenerateSecret")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.scope", ref="scope", :label="$t('entity.client.scope')",
            :hint="$t('entity.client.tip.scope')", persistent-hint,
            counter="100", :rules="[required('entity.client.resourceId'), maxLength(100)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.redirectUrl", ref="redirectUrl", :label="$t('entity.client.redirectUrl')",
            :hint="$t('entity.client.tip.redirectUrl')", persistent-hint,
            counter="100", :rules="[required('entity.client.redirectUrl'), maxLength(100)]")
        //v-col(cols="12", md="6")
          //v-text-field(v-model="res.authorities", ref="authorities", :label="$t('entity.client.authorities')",
            //:hint="$t('entity.client.tip.reserved')", persistent-hint,
            counter="100", :rules="[maxLength(100)]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.accessTokenValidity", ref="accessTokenValidity", :label="$t('entity.client.accessTokenValidity')",
            :hint="$t('entity.client.tip.accessTokenValidity')", persistent-hint, type="number",
            counter="100", :rules="[required('entity.client.accessTokenValidity')]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.refreshTokenValidity", ref="refreshTokenValidity", :label="$t('entity.client.refreshTokenValidity')",
            :hint="$t('entity.client.tip.refreshTokenValidity')", persistent-hint, type="number",
            counter="100", :rules="[required('entity.client.refreshTokenValidity')]")
        v-col(cols="12", md="6")
          v-text-field(v-model="res.sort", ref="sort", :label="$t('entity.base.sort')", type="number",
            :rules="[required('entity.base.sort')]")
        v-col(cols="12", md="6")
          v-select(v-model="res.grantTypes", ref="grantTypes", :label="$t('entity.client.grantTypes')", :items="grantTypes",
            :hint="$t('entity.client.tip.grantTypes')", persistent-hint, :rules="[required('entity.client.grantTypes')]",
            item-text="name", item-value="value", multiple, chips)
            template(v-slot:selection="{ item }")
              v-chip(color="secondary", dark, label, small) {{ item.name }}
        v-col(cols="12", sm="12")
          v-textarea(v-model="res.remark", :label="$t('entity.client.remark')", counter="200", rows="1",
            :rules="[maxLength(200)]")
        v-row(v-if="res.id !== null")
          v-col(cols="12", sm="6", lg="3")
            v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
          v-col(cols="12", sm="6", lg="3")
            v-text-field(:value="res.createUser", :label="$t('entity.base.createUser')", disabled)
          v-col(cols="12", sm="6", lg="3")
            v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
          v-col(cols="12", sm="6", lg="3")
            v-text-field(:value="res.modifyUser", :label="$t('entity.base.modifyUser')", disabled)
        v-col(cols="12", sm="6")
          v-switch(v-model="res.isEnable", :true-value="true", :false-value="false",
            :label="item.isEnable ? $t('action.enable') : $t('action.disable')")
        v-col.text-right(cols="12", sm="6")
          .mt-5
            v-btn.mr-4(outlined, color="warning", @click="handleReset") {{$t('action.reset')}}
            v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t('action.save')}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { grantTypes } from '@/utils/options'
import { v4 as uuidv4 } from 'uuid'
import { clientUpdate } from '@/api/client'

@Component
export default class ClientView extends Mixins(DialogViewMixin, FormValidateMixin) {
  private grantTypes = grantTypes

  async handleSave () {
    if (!this.$refs.form.validate()) return
    this.loading = true
    const res = this._.cloneDeep(this.res)
    res.grantTypes = res.grantTypes.join(',')
    clientUpdate(res).then(() => {
      this.$toast.success(this.$t('tip.success'))
      this.$emit('success', this.res)
    }).finally(() => {
      this.loading = false
    })
  }

  handleGenerateSecret () {
    const secret = uuidv4()
    this.res.spell = secret
    this.res.clientSecret = secret
  }
}
</script>

<style lang="stylus" scoped>

</style>
