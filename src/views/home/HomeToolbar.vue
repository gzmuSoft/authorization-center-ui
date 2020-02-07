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
        v-list-item(@click="handleLogout", v-if="auth.isLogin", link)
          v-list-item-title {{$t("action.logout")}}
        v-list-item(@click="handleLogin", v-else, link)
          v-list-item-title {{$t("action.login")}}
        v-list-item(@click="base.changeLocale()", link)
          v-list-item-title {{$t("language")}}
        v-list-item(@click="base.changeTheme()", link)
          v-list-item-title {{$t("base.theme.change")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BaseModule, AuthModule } from '@/store'
import { oauthServer, oauthLogout } from '@/api/oauth'
import Base from '@/store/module/base'
import Auth from '@/store/module/auth'

@Component
export default class HomeToolbar extends Vue {
  private base: Base = BaseModule
  private auth: Auth = AuthModule
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
