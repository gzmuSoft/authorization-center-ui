<template lang="pug">
  .img-view
    v-overlay(:value="base.imgView.show")
      .text-right
        v-btn(icon, @click="handleClick")
          v-icon mdi-close
      v-img(:src="base.imgView.img", @click="handleClick", max-width="900px")
      .text-center {{$t('tip.imgClose')}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vuetify from '@/plugins/vuetify'
import { BaseModule } from '@/store'
import Base from '@/store/module/base'

@Component
export default class ImgView extends Vue {
  private base: Base = BaseModule
  created () {
    this.$vuetify = vuetify.framework
  }
  handleClick () {
    this.base.changImg('')
  }
}
</script>

<style lang="stylus" scoped>

</style>
