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
        v-list-item(@click="handleLogin", link)
          v-list-item-title {{$t("action.login")}}
        v-list-item(@click="handleLanguage", link)
          v-list-item-title {{$t("language")}}
        v-list-item(@click="handleTheme", link)
          v-list-item-title {{$t("base.theme.change")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BaseModule, AuthModule } from '@/store'
import { oauthServer } from '@/api/oauth'

@Component
export default class HomeToolbar extends Vue {
  private loading: Boolean = false
  handleLanguage () {
    BaseModule.changeLocale()
  }
  handleTheme () {
    BaseModule.changeTheme()
  }
  handleLogin () {
    this.loading = true
    if (AuthModule.accessToken === null) {
      oauthServer()
        .then(res => { window.location = res.data.server })
        .finally(() => { this.loading = false })
    } else {
      console.log('success')
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
