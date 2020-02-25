<template lang="pug">
  v-row
    v-col(cols="12", md="4")
      v-skeleton-loader(type="image")
    v-col(cols="12", md="4")
      v-skeleton-loader(type="image")
    v-col(cols="12", md="4")
      v-skeleton-loader(type="image")
    v-col(v-for="i in num", :key="i", cols="12", md="6")
      v-skeleton-loader(type="card-heading")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SkeletonClient extends Vue {
  @Prop(Number) private num !: Number
}
</script>

<style lang="stylus" scoped>

</style>
