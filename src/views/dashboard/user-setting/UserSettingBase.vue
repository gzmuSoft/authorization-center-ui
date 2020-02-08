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
      v-form
        v-layout(wrap, style="width:100%")
          v-flex(sm12)
            v-text-field(v-model="user.name", ref="username", :label="$t('entity.user.name')"
              :hint="$t('entity.user.tip.name')", persistent-hint)
          v-flex(sm12)
            v-text-field(v-model="user.email", ref="email", :label="$t('entity.user.email')")
          v-flex(sm12)
            v-text-field(v-model="user.phone", ref="phone", :label="$t('entity.user.phone')")
          v-flex(sm12)
            v-text-field(v-model="user.password", ref="password", type="password", :label="$t('entity.user.password')")
          v-flex(sm12)
            v-text-field(v-model="user.rePassword", ref="rePassword", type="password", :label="$t('entity.user.password')")
    v-card-actions
      v-spacer
      v-expand-transition
        .action(v-show="change")
          v-btn.mr-5(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
          v-btn(outlined, color="success") {{$t("action.save")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { oauthMe } from '@/api/oauth'

@Component
export default class UserSettingBase extends Vue {
  private default: any = {}
  private user: any = {}
  private image: String = ''
  private tip: Boolean = false
  created () {
    oauthMe().then(res => {
      this.user = res.data
      this.default = this._.cloneDeep(res.data)
      this.image = this.user.avatar
    })
  }
  get change () {
    return !this._.isEqual(this.user, this.default)
  }
  handleReset () {
    this.user = this._.cloneDeep(this.default)
  }
  handleImg (type) {
    if (type === 0) this.image = this.user.avatar
    else this.image = this.user.image
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
