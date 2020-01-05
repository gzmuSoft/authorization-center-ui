<template lang="pug">
  #dashboard
    dashboard-toolbar(@handle-change="changeDrawer", @handle-theme="changeTheme")
    v-navigation-drawer(v-model="drawer", app, clipped)
      dashboard-menu(:routes="routes")
    v-content
      v-scroll-y-transition(mode="out-in")
        router-view
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashboardToolbar from '@/views/dashboard/DashboardToolbar.vue'
import DashboardMenu from '@/views/dashboard/DashboardMenu.vue'
import { BaseModule } from '@/store'

@Component({
  components: { DashboardToolbar, DashboardMenu }
})
export default class Dashboard extends Vue {
  drawer: Boolean = true
  routes: Array<Object> = [
    {
      name: '系统管理',
      children: [
        { text: '仪表盘', icon: 'mdi-view-dashboard', to: { name: 'index' } }
      ]
    }
  ]
  changeDrawer () { this.drawer = !this.drawer }
  changeTheme () {
    BaseModule.changTheme()
    this.$vuetify.theme.dark = BaseModule.theme
  }
  created () {
    this.$vuetify.theme.dark = BaseModule.theme
  }
}
</script>
