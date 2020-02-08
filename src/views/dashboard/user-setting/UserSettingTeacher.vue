<template lang="pug">
  v-card.setting-entity
    v-card-title
      card-header(icon="mdi-account-box")
      | {{ $t("title.setting.entity") }}
    v-card-text

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import UserSettingFormMixin from './UserSettingFormMixin'

@Component({
  components: { CardHeader }
})
export default class UserSettingEntity extends Mixins(UserSettingFormMixin) {
  async created () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
