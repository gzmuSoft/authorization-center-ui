<template lang="pug">
  section
    v-parallax(src="https://resources.echocow.cn/file/2020/01/31/section.jpg", height="380")
      v-layout(column, align-center, justify-center)
        .headline.white--text.mb-4.text-center {{$t("home.info.developmentTitle")}}
        em {{$t("home.info.developmentInfo")}}
        v-btn.mt-12(color="info", large, href="/")
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
