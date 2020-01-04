<template lang="pug">
  #dashboard
    dashboard-toolbar(@handle-change="changeDrawer")
    v-navigation-drawer(v-model="drawer", app, clipped)
      dashboard-menu(:routes="routes")
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DashboardToolbar from '@/components/dashboard/DashboardToolbar.vue'
import DashboardMenu from '@/components/dashboard/DashboardMenu.vue'

@Component({
  components: { DashboardToolbar, DashboardMenu }
})
export default class Dashboard extends Vue {
  drawer: Boolean = true
  routes: Array<any> = []
  changeDrawer () { this.drawer = !this.drawer }
}
</script>
