<template lang="pug">
  v-card.setting-base
    v-card-title.setting-avatar.text-center(style="width:100%;height:190px")
      v-avatar.mx-auto.elevation-18(height="150px", width="150px")
        v-img.setting-avatar-img(:src="image")
      v-tooltip(bottom, v-model="tip")
        template(v-slot:activator="{ on }")
          v-btn(icon, v-on="on", @click="tip = true", style="position: absolute; right: 0;")
            v-icon mdi-help-circle-outline
        span {{$t("tip.avatar")}}
        br
        span {{$t("tip.photo")}}
      v-bottom-navigation.elevation-0.mt-10(horizontal, grow, height="40px", :value="0", color="deep-purple")
        v-btn(@click="handleImg(0)") {{$t("title.setting.avatar")}}
        v-btn(@click="handleImg(1)") {{$t("title.setting.photo")}}
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(sm12)
            v-text-field(:value="user.name", ref="username", :label="$t('entity.user.name')", disabled)
          v-flex(sm12)
            v-text-field(v-model="user.email", ref="email", :label="$t('entity.user.email')", @blur="emailExist",
              :rules="[rangeLength(4, 35), email()]")
          v-flex(sm12)
            v-text-field(v-model="user.phone", ref="phone", :label="$t('entity.user.phone')", @blur="phoneExist",
              :rules="[equalsLength(11)]")
          v-flex(sm12)
            v-text-field(v-model="user.password", ref="password", type="password", :label="$t('entity.user.password')",
              :rules="[noRequiredRangeLength(6, 20)]")
          v-flex(sm12)
            v-text-field(v-model="user.rePassword", ref="rePassword", type="password", :label="$t('entity.user.password')",
              :rules="[noRequiredRangeLength(6, 20), passwordEquals]")
    v-card-actions
      v-spacer
      v-expand-transition
        .action(v-show="change")
          v-btn.mr-5(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
          v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t("action.save")}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import { oauthMe } from '@/api/oauth'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { updateUser } from '@/api/setting'
import { userExist } from '@/api/base'

@Component
export default class UserSettingBase extends Mixins(FormValidateMixin) {
  private default: any = {}
  private user: any = {}
  private image: String = ''
  private tip: Boolean = false
  private loading: Boolean = false
  $refs: {
    form: any,
    email: any,
    phone: any
  }
  created () {
    oauthMe().then(res => {
      this.user = res.data
      this.default = this._.cloneDeep(res.data)
      this.image = this.user.avatar
      this.$refs.form.resetValidation()
    })
  }
  get change () {
    return !this._.isEqual(this.user, this.default)
  }
  handleReset () {
    this.user = this._.cloneDeep(this.default)
    this.$refs.form.resetValidation()
  }
  async handleSave () {
    this.loading = true
    try {
      if (!this.$refs.form.validate()) {
        this.$toast.warning(this.$t('tip.validate.complete'))
        return
      }
      const email = await this.emailExist()
      if (email) return
      const phone = await this.phoneExist()
      if (phone) return
      updateUser(this.user).then(() => {
        this.$toast.success(this.$t('tip.success'))
        this.user.password = ''
        this.user.rePassword = ''
        this.default = this._.cloneDeep(this.user)
      })
    } finally {
      this.loading = false
    }
  }
  handleImg (type) {
    if (type === 0 && this.user.avatar !== null) this.image = this.user.avatar
    else if (type === 1 && this.user.image !== null) this.image = this.user.image
  }
  passwordEquals () {
    return this.user.password === this.user.rePassword || this.$t('tip.validate.password')
  }
  async emailExist () {
    if (this.user.email === this.default.email) return false
    const res: any = await userExist({ email: this.user.email })
    if (res.data.exist) {
      this.$refs.email.errorBucket = [this.$t('tip.validate.exist', [this.user.email])]
      return true
    }
    return false
  }
  async phoneExist () {
    if (this.user.phone === this.default.phone) return false
    const res: any = await userExist({ phone: this.user.phone })
    if (res.data.exist) {
      this.$refs.phone.errorBucket = [this.$t('tip.validate.exist', [this.user.phone])]
      return true
    }
    return false
  }
}
</script>

<style lang="stylus" scoped>
.setting-avatar
  top -70px
  position relative
.setting-avatar-img
  transition transform 0.5s ease-in
  &:hover
    -moz-transform rotate(360deg)
    -o-transform rotate(360deg)
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
</style>
