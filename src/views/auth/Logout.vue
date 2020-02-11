<template lang="pug">
  #auth-logout.fill-height.mx-auto.justify-center.align-center.d-flex.flex-column
    v-progress-circular(indeterminate, color="red", :size="120", :width="10")
    p.blue--text.text-center.mt-6(style="width:300px") {{$t(tipI18n)}}{{last}}
    v-progress-linear(indeterminate, rounded, height="6", striped)
    v-expand-transition
      v-btn.mt-6(color="primary", outlined, v-show="show", @click="handleBack") {{$t("tip.login.again")}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import Mixin from './Mixin'
import { Action } from 'vuex-class'

@Component
export default class Logout extends Mixins(Mixin) {
  @Action('oauthToken', { namespace: 'auth' }) public oauthToken!: Function
  @Action('changeRoutes', { namespace: 'route' }) public changeRoutes!: Function
  created () {
    this.tipI18n = 'tip.logout.loading'
    this.oauthToken(null)
    this.changeRoutes(false)
    this.tipI18n = 'tip.logout.success'
    setTimeout(() => {
      this.handleBack()
    }, 1000)
  }
}
</script>

<style lang="stylus" scoped>

</style>
