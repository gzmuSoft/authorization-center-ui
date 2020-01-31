<template lang="pug">
  v-app
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseModule } from '@/store'

export default Vue.extend({
  name: 'App',
  data: () => ({
  }),
  created () {
    this.$i18n.locale = BaseModule.locale
    this.$vuetify.lang.current = BaseModule.locale
    this.$vuetify.theme.dark = BaseModule.theme
  }
})
</script>

<style lang="stylus">
html, body
  overflow hidden
.ps__rail-y
  top 0 !important
.ps__rail-x
  left 0 !important
</style>
