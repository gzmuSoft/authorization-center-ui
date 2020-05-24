<template lang="pug">
  v-card.auth-chart.pa-1
    v-sheet.auth-chart-top.ml-5(:color="color", elevation="12", max-width="calc(100% - 32px)", v-if="value.length > 0")
      v-sparkline(:labels="labels"
        :value="value",
        :line-width="lineWidth",
        :padding="padding",
        :type="type",
        :gradient="gradient",
        :fill="fill",
        auto-line-width,
        auto-draw,
        :show-labels="true"
      )
    v-card-text.pt-0
      .title.font-weight-light.mb-2 {{ title }}
      .subheading.font-weight-light.grey--text {{ subTitle }}
      v-divider.my-2
      v-icon.mr-2(small) {{ icon }}
      span.caption.grey--text.font-weight-light {{ description }}
      v-menu(left, offset-x, :close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.float-right(icon, v-on="on", small, style="top: -10px")
            v-icon(small) mdi-allergy
        v-list
          v-list-item
            v-list-item-avatar.ma-0 类型
            v-list-item-action
              v-switch(v-model="type", value="trend", false-value="bar")
          v-list-item
            v-list-item-avatar.ma-0 填充
            v-list-item-action
              v-switch(v-model="fill", :value="true", :false-value="false")
          v-list-item
            v-item-group(v-model="gradient", mandatory)
              v-layout
                v-item(v-for="(gradient, i) in gradients", :key="i", v-slot:default="{ active, toggle }", :value="gradient")
                  v-card(
                    :style="{background: gradient.length > 1 ? `linear-gradient(0deg, ${gradient})` : gradient[0], border: '2px solid', borderColor: active ? '#222' : 'white' }"
                    width="30"
                    height="30"
                    class="mr-2"
                    @click.native="toggle"
                  )
          v-list-item
            v-list-item-content.pt-5
              v-slider(v-model="padding", :min="0", :max="25", thumb-label, thumb-size="20", :messages="`图表边距为：${padding}`")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
const gradients = [
  ['#ff4900'],
  ['yellow'],
  ['red', 'orange', 'yellow'],
  ['white'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea']
]
@Component
export default class ChartCard extends Vue {
  @Prop({ type: String, default: '' }) private description !: String
  @Prop({ type: String, default: '' }) private icon !: String
  @Prop({ type: String, default: '' }) private subTitle !: String
  @Prop({ type: String, default: '' }) private title !: String
  @Prop({ type: String, default: 'green' }) private color !: String
  @Prop({ type: Array, default: [] }) private labels !: Array<any>
  @Prop({ type: Array, default: [] }) private value !: Array<any>
  @Prop({ type: Number, default: 2 }) private lineWidth !: Number
  gradients = gradients
  fill = false
  type = 'trend'
  gradient = gradients[Math.ceil(Math.random() * 5)]
  padding = 15
}
</script>

<style lang="stylus" scoped>
  .auth-chart-top
    top -24px
    position relative
</style>
