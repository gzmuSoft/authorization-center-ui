<template lang="pug">
  v-menu.date-menu(v-model="dateMenu", :close-on-content-click="false", transition="scale-transition",
    offset-y, max-width="290px", min-width="290px")
    template(v-slot:activator="{ on }")
      v-text-field(v-model="value", v-on="on", :label="label", readonly, :disabled="disabled")
    v-date-picker(v-model="initDate", no-title, @input="dateMenu = false", :locale="locale")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { BaseModule } from '@/store'

@Component
export default class DateMenu extends Vue {
  // Data -----------
  private dateMenu: Boolean = false
  private initDate: String = new Date().toISOString()
  // Prop -----------
  @Prop(String) private value: String
  @Prop(String) private label: String
  @Prop({
    type: String,
    default: 'day',
    validator: (value) => ['day', 'month'].indexOf(value) !== -1
  }) private type: String
  @Prop({ type: Boolean, default: false })
  private disabled: Boolean
  @Prop({ type: String, default: null })
  private init: String
  @Prop({ type: Function, default: (date) => date })
  private formatDate: Function
  // Watch -----------
  @Watch('initDate')
  onInitDateChange (val) {
    if (!val) return
    this.$emit('input', this.formatDate(val))
  }
  // init -----------
  created () {
    if (this.init !== null) this.initDate = this.init
    if (this.type === 'day') this.initDate = this.initDate.substring(0, 10)
    else if (this.type === 'month') this.initDate = this.initDate.substring(0, 7)
  }
  // getter ---------
  get locale () {
    return BaseModule.locale
  }
}
</script>

<style lang="stylus" scoped>

</style>
