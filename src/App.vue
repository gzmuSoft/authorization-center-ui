<template lang="pug">
  v-app
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script lang="ts">
import Vue from 'vue'
import { BaseModule } from '@/store'
import { oauthServer } from '@/api/oauth'

export default Vue.extend({
  name: 'App',
  data: () => ({
  }),
  created () {
    this.$i18n.locale = BaseModule.locale
    this.$vuetify.lang.current = BaseModule.locale
    oauthServer()
  }
})
</script>
