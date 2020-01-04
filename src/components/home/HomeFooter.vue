<template lang="pug">
  v-footer#center-footer(color="blue darken-2")
    v-layout(row wrap align-center)
      v-flex(xs12)
        .white--text.ml-4.text-center
          | {{$t("base.school")}}
          v-icon.red--text mdi-heart
          | {{$t("base.name")}}
          | by &nbsp;
          a.white--text(href="https://echocow.cn" target="_blank") EchoCow
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeFooter extends Vue {

}
</script>

<style lang="stylus" scoped>

</style>
