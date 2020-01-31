<template lang="pug">
  section#center-banner
    v-parallax(src="https://resources.echocow.cn/file/2020/01/30/hero.jpeg", height="600")
      v-layout.white--text(column, align-center, justify-center)
        img(alt="Vuetify.js", height="200",
          src="https://resources.echocow.cn/file/2020/1/31/logo.png")
        h1.white--text.mb-2.display-1.text-center {{$t("base.name")}}
        .subheading.mb-4.text-center {{$t(("base.description"))}}
        v-btn.mt-12(color="primary", large, href="/dashboard")
          | {{$t("base.start")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Banner extends Vue {

}
</script>

<style lang="stylus" scoped>

</style>
