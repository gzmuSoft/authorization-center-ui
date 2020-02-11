<template lang="pug">
  v-app-bar(app, fixed, elevate-on-scroll)
    v-toolbar-title
      span.title {{$t("base.school")}}
    v-spacer
    v-menu(offset-y, :close-on-content-click="false")
      template(v-slot:activator="{ on }")
        v-btn(icon, v-on="on")
          v-icon mdi-menu
      v-list
        v-list-item(@click="handleLogout", v-if="isLogin", link)
          v-list-item-title {{$t("action.logout")}}
        v-list-item(@click="handleLogin", v-else, link)
          v-list-item-title {{$t("action.login")}}
        v-list-item(@click="changeLocale()", link)
          v-list-item-title {{$t("language")}}
        v-list-item(@click="changeTheme()", link)
          v-list-item-title {{$t("base.theme.change")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { oauthServer, oauthLogout } from '@/api/oauth'
import { Action, Getter } from 'vuex-class'
const base = 'base'

@Component
export default class HomeToolbar extends Vue {
  @Getter('isLogin', { namespace: 'auth' }) public isLogin!:Boolean
  @Action('changeLocale', { namespace: base }) public changeLocale!:Function
  @Action('changeTheme', { namespace: base }) public changeTheme!:Function
  handleLogin () {
    oauthServer().then(res => { window.location = res.data.server })
      .catch(() => { this.$toast.error(this.$t('tip.error.action')) })
  }
  handleLogout () {
    oauthLogout().then(res => { window.location = res.data.server })
      .catch(() => { this.$toast.error(this.$t('tip.error.action')) })
  }
}
</script>

<style lang="stylus" scoped>

</style>
