<template lang="pug">
  v-fade-transition.skeleton-student(hide-on-leave, mode="out-in")
    v-row(v-if="init")
      v-col(cols="12", md="6")
        v-skeleton-loader(type="card-heading")
      v-col(cols="12", md="6")
        v-skeleton-loader(type="card-heading")
      v-col(v-for="i in num", :key="i", cols="12", sm="6", md="4", lg="3", xl="2")
        v-skeleton-loader(type="list-item-avatar-two-line")
    .skeleton-student-show(v-else)
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SkeletonStudent extends Vue {
  @Prop(Boolean) private init !: Boolean
  @Prop(Number) private num !: Number
}
</script>

<style lang="stylus" scoped>

</style>
