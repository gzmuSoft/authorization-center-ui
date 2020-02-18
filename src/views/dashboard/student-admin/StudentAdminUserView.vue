<template lang="pug">
  v-dialog.student-admin-user-view(v-model="show", max-width="600px")
    v-card(:loading="loading")
      v-card-title.setting-avatar.text-center
        span {{$t("title.info")}}
        v-spacer
        v-tooltip(left)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-alert(dense, text, type="warning", :value="!res.userEdit") {{$t('tip.editNoPermission')}}
        .text-center(style="width: 100%")
          v-avatar.mx-auto.elevation-18(height="150px", width="150px")
            v-img.setting-avatar-img(:src="image", v-img-view)
        v-bottom-navigation.elevation-0.mt-10(horizontal, grow, height="40px", :value="0", color="deep-purple")
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn(@click="type = 0", v-on="on") {{$t("title.setting.avatar")}}
            span {{$t("tip.avatar")}}
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn(@click="type = 1", v-on="on") {{$t("title.setting.photo")}}
            span {{$t("tip.photo")}}
        v-form(ref="form")
          v-layout(wrap, style="width:100%")
            v-flex(sm12)
              v-text-field(v-model="res.name", ref="username", :label="$t('entity.user.name')", @blur="nameExist", :disabled="!res.userEdit")
            v-flex(sm12)
              v-text-field(v-model="res.email", ref="email", :label="$t('entity.user.email')", @blur="emailExist", :disabled="!res.userEdit",
                :rules="[rangeLength(4, 35), email()]")
            v-flex(sm12)
              v-text-field(v-model="res.phone", ref="phone", :label="$t('entity.user.phone')", @blur="phoneExist", :disabled="!res.userEdit",
                :rules="[equalsLength(11)]")
            v-flex(sm12)
              v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
            v-flex(sm12)
              v-text-field(:value="res.createUser", :label="$t('entity.base.createUser')", disabled)
            v-flex(sm12)
              v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
            v-flex(sm12)
              v-text-field(:value="res.modifyUser", :label="$t('entity.base.modifyUser')", disabled)
            //v-flex(sm12)
            //  v-text-field(v-model="res.password", ref="password", type="password", :label="$t('entity.user.password')",
            //    :rules="[noRequiredRangeLength(6, 20)]")
            //v-flex(sm12)
            //  v-text-field(v-model="res.rePassword", ref="rePassword", type="password", :label="$t('entity.user.password')",
            //    :rules="[noRequiredRangeLength(6, 20), passwordEquals]")
      v-card-actions
        v-spacer
        v-expand-transition
          .action(v-show="change")
            v-btn.mr-5(outlined, color="warning", @click="handleReset", :disabled="res.userEdit") {{$t("action.reset")}}
            v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t("action.save")}}
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import { userExist } from '@/api/base'
import { userUpdate } from '@/api/user'

@Component
export default class StudentAdminUserView extends Mixins(FormValidateMixin, DialogViewMixin) {
  private type: Number = 0
  $refs: {
    form: any,
    username: any,
    email: any,
    phone: any
  }
  get change () {
    return !this._.isEqual(this.res, this.item)
  }
  get image () {
    if (this.type === 0 && this.res.avatar !== null) return this.res.avatar
    else if (this.type === 1 && this.res.image !== null) return this.res.image
    else return ''
  }
  passwordEquals () {
    return this.res.password === this.res.rePassword || this.$t('tip.validate.password')
  }
  async nameExist () {
    if (this.res.name === this.item.name) return false
    const res: any = await userExist({ name: this.res.name })
    if (res.data.exist) {
      this.$refs.username.errorBucket = [this.$t('tip.validate.exist', [this.res.name])]
      return true
    }
    return false
  }
  async emailExist () {
    if (this.res.email === this.item.email) return false
    const res: any = await userExist({ email: this.res.email })
    if (res.data.exist) {
      this.$refs.email.errorBucket = [this.$t('tip.validate.exist', [this.res.email])]
      return true
    }
    return false
  }
  async phoneExist () {
    if (this.res.phone === this.item.phone) return false
    const res: any = await userExist({ phone: this.res.phone })
    if (res.data.exist) {
      this.$refs.phone.errorBucket = [this.$t('tip.validate.exist', [this.res.phone])]
      return true
    }
    return false
  }
  async handleSave () {
    this.loading = true
    userUpdate(this.res).then(() => {
      this.$toast.success(this.$t('tip.success'))
      this.show = false
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
