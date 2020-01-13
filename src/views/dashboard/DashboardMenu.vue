<template lang="pug">
  #dashboard-menu
    div(v-for="(menu,index) in routes", :key="index")
      v-list-item-group.py-1(v-if="!menu.children", color="primary")
        v-list-item(:to="menu.to", :key="index", link)
          v-list-item-action
            v-icon {{ menu.icon }}
          v-list-item-content
            v-list-item-title {{menu.text}}
      v-subheader.grey--text.text--darken-1(v-else) {{menu.name}}
      dashboard-menu(:routes="menu.children")

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class DashboardMenu extends Vue {
  @Prop({ type: Array }) routes!: Array<Object>
}
</script>

<style lang="stylus" scoped>

</style>
