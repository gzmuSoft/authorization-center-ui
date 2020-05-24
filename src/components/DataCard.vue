<template lang="pug">
  v-card.rigth.pa-1
    v-sheet.auth-card-icon.ml-5.text-center(:color="iconColor", :elevation="elevation", :width="width", :height="height")
      v-icon.fill-height.fill-width.white--text(:size="iconSize") {{ icon }}
    v-card-text.pa-2
      p.grey--text.font-weight-light.ma-0.text-right {{ subTitle }}
      p.display-1.ma-0.text-right {{ main }}
      v-divider.my-2
      v-icon.mr-2.text-left(small) {{ actionIcon }}
      span.caption.grey--text.font-weight-light.text-left {{ action }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DataCard extends Vue {
  @Prop({ type: String, required: true }) private iconColor !: String
  @Prop({ type: String, required: true }) private icon !: String
  @Prop({ type: String, default: '' }) private subTitle !: String
  @Prop({ type: String, default: '' }) private main !: String
  @Prop({ type: String, required: true }) private actionIcon !: String
  @Prop({ type: String, default: '' }) private action !: String
  @Prop({ type: Number, default: 48 }) private iconSize !: Number
  @Prop({ type: Number, default: 5 }) private elevation !: Number
  @Prop({ type: Number, default: 92 }) private width !: Number
  @Prop({ type: Number, default: 92 }) private height !: Number
}
</script>

<style lang="stylus" scoped>
.auth-card-icon
  top -24px
  position absolute
</style>
