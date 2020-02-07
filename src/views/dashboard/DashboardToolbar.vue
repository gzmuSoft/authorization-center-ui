<template lang="pug">
  v-app-bar#dashboard-toolbar(app, clipped-left, color="primary")
    v-app-bar-nav-icon.white--text(@click.stop="handleChange")
    v-toolbar-title.mr-12.align-center
      span.title.white--text {{$t("base.name")}}
    v-spacer
    v-tooltip(bottom)
      template(v-slot:activator="{ on }")
        v-btn(icon, v-on="on", @click="handleTheme")
          v-icon.white--text mdi-navigation
      span {{$t("base.theme.change")}}
    v-menu(offset-y)
      template(v-slot:activator="{ on }")
        v-btn(icon, v-on="on", large)
          v-avatar(size="32")
            img(alt="Avatar", :src="user.avatar")
      v-card
        v-list
          v-list-item
            v-list-item-avatar
              img(alt="Avatar", :src="user.avatar")
            v-list-item-content
              v-list-item-title {{user.name}}
              v-list-item-subtitle {{user.email}}
        v-divider
        v-list
          v-list-item(link, :to="{name: 'system-setting'}")
            v-list-item-avatar
              v-icon mdi-settings mdi-spin
            v-list-item-content {{$t('setting.system')}}
          v-list-item(link, :to="{name: 'user-setting'}")
            v-list-item-avatar
              v-icon mdi-account
            v-list-item-content {{$t('setting.user')}}
          v-list-item(link, @click="base.changeLocale")
            v-list-item-avatar
              v-icon mdi-all-inclusive
            v-list-item-content {{$t('language')}}
        v-divider
        v-list
          v-list-item(link, @click="handleLogout")
            v-list-item-avatar
              v-icon.error--text mdi-exit-to-app
            v-list-item-content.error--text.font-weight-bold {{$t('action.logout')}}
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { UserModule, BaseModule } from '@/store'
import User from '@/store/module/user'
import Base from '@/store/module/base'
import { oauthLogout } from '@/api/oauth'

@Component
export default class DashboardToolbar extends Vue {
  user: User = UserModule
  base: Base = BaseModule
  @Emit('handle-change') handleChange () {}
  @Emit('handle-theme') handleTheme () {}
  handleLogout () {
    oauthLogout().then(res => { window.location = res.data.server })
      .catch(() => { this.$toast.error(this.$t('tip.error.action')) })
  }
}
</script>
