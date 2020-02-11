<template lang="pug">
  .img-view
    v-overlay(:value="imgView.show")
      .text-right
        v-btn(icon, @click="changImg")
          v-icon mdi-close
      v-img(:src="imgView.img", @click="changImg", max-width="900px")
      .text-center {{$t('tip.imgClose')}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vuetify from '@/plugins/vuetify'
import { Action, State } from 'vuex-class'

@Component
export default class ImgView extends Vue {
  @State('imgView', { namespace: 'base' }) public imgView!: any
  @Action('changImg', { namespace: 'base' }) public changImg!: Function
  created () {
    this.$vuetify = vuetify.framework
  }
}
</script>

<style lang="stylus" scoped>

</style>
