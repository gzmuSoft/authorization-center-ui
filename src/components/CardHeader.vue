<template lang="pug">
  v-sheet.card-header.pa-7.white--text.mx-2(elevation="8", :color="color", width="100%")
    div(style="line-height:1")
      v-icon.mr-5(color="white", size="32") {{icon}}
      span.mr-5.my-0 {{title}}
      span.mr-5.my-0 {{subTitle}}
      br
      span.caption {{info}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CardHeader extends Vue {
  @Prop({ default: 'third' }) color!: String
  @Prop({ default: '' }) subTitle!: String
  @Prop({ default: '' }) info: String
  @Prop(String) icon!: String
  @Prop(String) title!: String
}
</script>

<style lang="stylus" scoped>
.card-header {
  width auto
  position relative
  top -30px
}
</style>
