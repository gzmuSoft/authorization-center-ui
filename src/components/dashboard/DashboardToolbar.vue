<template lang="pug">
  v-app-bar#dashboard-toolbar(app, clipped-left, color="primary")
    v-app-bar-nav-icon.white--text(@click.stop="handleChange")
    v-toolbar-title.mr-12.align-center
      span.title.white--text {{$t("base.name")}}
    v-spacer
    v-btn(icon, @click="")
      v-icon.white--text mdi-navigation
    v-menu(offset-y)
      template(v-slot:activator="{ on }")
        v-btn(icon, v-on="on", large)
          v-icon.white--text mdi-dots-vertical
      v-list
        v-list-item test1
        v-list-item test2
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class DashboardToolbar extends Vue {
  @Emit('handle-change')
  handleChange () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
