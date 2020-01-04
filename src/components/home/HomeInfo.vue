<template lang="pug">
  section#center-info
    v-layout.my-12(column wrap align-center)
      v-flex.my-4(xs12 sm4)
        .text-center
          h1.display-1 {{$t('home.info.title')}}
          .subheading.mt-3 {{$t('home.info.titleInfo')}}
      v-flex(xs12)
        v-container(grid-list-xl)
          v-layout.px-xl-12.mx-xl-12(row wrap)
            v-flex(xs12, md4, v-for="(a, i) in information", :key="i")
              v-card.transparent(flat)
                v-card-text.text-center
                  v-icon.blue--text.text--lighten-2(style="font-size: 108px") {{a.icon}}
                v-card-title.layout.justify-center(primary-title)
                  .headline.text-center {{a.title}}
                v-card-text {{a.content}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeInfo extends Vue {
  protected get information () {
    return [
      { icon: 'mdi-palette', title: this.$t('home.info.subTitle1'), content: this.$t('home.info.subTitle1Info') },
      { icon: 'mdi-palette', title: this.$t('home.info.subTitle2'), content: this.$t('home.info.subTitle2Info') },
      { icon: 'mdi-palette', title: this.$t('home.info.subTitle3'), content: this.$t('home.info.subTitle3Info') }
    ]
  }
}
</script>

<style lang="stylus" scoped>

</style>
