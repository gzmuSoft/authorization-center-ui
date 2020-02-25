<template lang="pug">
  v-row
    v-col(cols="12", md="4", xl="3")
      v-skeleton-loader(type="card-heading@3")
    v-col(cols="12", md="4", xl="3")
      v-skeleton-loader(type="list-item@5")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SkeletonRole extends Vue {

}
</script>

<style lang="stylus" scoped>

</style>
