<template lang="pug">
  #dashboard
    dashboard-toolbar(@handle-change="handleChangeDrawer", @handle-theme="handleChangeTheme")
    v-navigation-drawer(v-model="drawer", app, clipped)
      dashboard-menu(:routes="routes")
    v-content
      v-container(fluid, grid-list-md)
        v-scroll-y-transition(mode="out-in")
          router-view.mt-2
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashboardToolbar from '@/views/dashboard/DashboardToolbar.vue'
import DashboardMenu from '@/views/dashboard/DashboardMenu.vue'
import { meMenu } from '@/api/auth'
import { Action, State } from 'vuex-class'
const base = 'base'
const user = 'user'
@Component({
  components: { DashboardToolbar, DashboardMenu }
})
export default class Dashboard extends Vue {
  drawer: Boolean = true
  routes: Array<Object> = []
  @State('theme', { namespace: base }) public theme!: Boolean
  @State('drawer', { namespace: base }) public drawerState!: Boolean
  @Action('getUser', { namespace: user }) public getUser!: Function
  @Action('changeDrawer', { namespace: base }) public changeDrawer!: Function
  @Action('changeTheme', { namespace: base }) public changeTheme!: Function
  created () {
    this.$vuetify.theme.dark = this.theme as boolean
    this.drawer = this.drawerState
    meMenu().then(res => { this.routes = res.data.menus })
    this.getUser()
  }
  handleChangeDrawer () {
    this.changeDrawer()
    this.drawer = !this.drawer
  }
  handleChangeTheme () {
    this.changeTheme()
    this.$vuetify.theme.dark = this.theme as boolean
  }
}
</script>
