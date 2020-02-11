<template lang="pug">
  v-app
    img-view
    v-fade-transition(hide-on-leave, mode="out-in")
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import ImgView from '@/plugins/img-view/ImgView.vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'

const base = 'base'
@Component({ components: { ImgView } })
export default class App extends Vue {
  @State('locale', { namespace: base }) public locale!: string
  @State('theme', { namespace: base }) public theme!: boolean
  created () {
    this.$i18n.locale = this.locale
    this.$vuetify.lang.current = this.locale
    this.$vuetify.theme.dark = this.theme
  }
}
</script>

<style lang="stylus">
.ps__rail-y
  top 0 !important
.ps__rail-x
  left 0 !important
</style>
