<template lang="pug">
  v-app
    img-view
    v-fade-transition(hide-on-leave, mode="out-in")
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import ImgView from '@/plugins/img-view/ImgView.vue'
import { BaseModule } from '@/store'

export default Vue.extend({
  name: 'App',
  components: { ImgView },
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
.ps__rail-y
  top 0 !important
.ps__rail-x
  left 0 !important
</style>
