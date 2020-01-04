<template lang="pug">
  v-app
    v-fade-transition(hide-on-leave)
      router-view
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
  })
})
</script>
