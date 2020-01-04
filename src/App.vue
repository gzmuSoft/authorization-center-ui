<template lang="pug">
  v-app
    v-app-bar(app color="primary" dark)
      .d-flex.align-cente
        v-img(src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="40"
        )
        v-img(src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          width="100"
        )
      v-spacer
      v-btn(href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      )
        .mr-2 {{$t("message")}}
        v-icon mdi-open-in-new
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
  })
})
</script>
