<template lang="pug">
  section#center-contact
    v-container(grid-list-xl)
      v-layout.my-12(row, wrap, justify-center)
        v-flex(xs12, sm4)
          v-card.transparent(flat)
            v-card-title.layout.justify-center(primary-title)
              .headline Company info
            v-card-text
              | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
              | Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              | Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti.
        v-flex(xs12, sm4, offset-sm1)
          v-card.transparent(flat)
            v-card-title.layout.justify-center(primary-title)
              .headline Contact us
            v-card-text
              | Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
            v-list.transparent
              v-list-item
                v-list-item-action
                  v-icon.blue--text.text--lighten-2 mdi-phone
                v-list-item-content
                  v-list-item-title 777-867-5309
              v-list-item
                v-list-item-action
                  v-icon.blue--text.text--lighten-2 mdi-map-marker
                v-list-item-content
                  v-list-item-title Chicago, US
              v-list-item
                v-list-item-action
                  v-icon.blue--text.text--lighten-2 mdi-email
                v-list-item-content
                  v-list-item-title john@vuetifyjs.com
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeContact extends Vue {

}
</script>

<style lang="stylus" scoped>

</style>
