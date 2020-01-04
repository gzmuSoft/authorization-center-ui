<template lang="pug">
  section
    v-parallax(src="https://raw.githubusercontent.com/vuetifyjs/parallax-starter/master/template/assets/section.jpg" height="380")
      v-layout(column align-center justify-center)
        .headline.white--text.mb-4.text-center {{$t("home.info.developmentTitle")}}
        em {{$t("home.info.developmentInfo")}}
        v-btn.mt-12(color="info" large href="/")
          | {{$t("base.start")}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeDevelopment extends Vue {

}
</script>

<style lang="stylus" scoped>

</style>
