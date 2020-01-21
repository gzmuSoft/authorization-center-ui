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
  created (): void {
    this.$i18n.locale = BaseModule.locale
    this.$vuetify.lang.current = BaseModule.locale
  }
})
</script>
