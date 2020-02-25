<template lang="pug">
  v-slide-y-transition(mode="out-in")
    v-row(v-if="init")
      v-col(cols="12", :sm="sm", :md="md", :lg="lg", v-for="i in num", :key="i")
        v-skeleton-loader(type="card-heading")
      v-col(cols="12")
        v-skeleton-loader(type="heading")
      v-col(cols="12")
        v-skeleton-loader(type="table")
    .show(v-else)
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SkeletonTable extends Vue {
  @Prop(Boolean) private init !: Boolean
  @Prop(Number) private num !: Number
  @Prop(Number) private sm !: Number
  @Prop(Number) private md !: Number
  @Prop(Number) private lg !: Number
}
</script>

<style lang="stylus" scoped>

</style>
