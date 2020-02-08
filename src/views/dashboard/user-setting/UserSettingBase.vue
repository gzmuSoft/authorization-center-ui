<template lang="pug">
  v-card.setting-base
    v-card-title {{ $t("title.setting.base") }}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UserSettingBase extends Vue {
  created () {

  }
}
</script>

<style lang="stylus" scoped>

</style>
