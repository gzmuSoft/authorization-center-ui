<template lang="pug">
  v-toolbar
    v-toolbar-title
      span.title {{$t("base.school")}}
    v-spacer
    div.d-none.d-sm-flex
      v-btn(@click="handleChange") {{$t("language")}}
      v-btn.ml-2(@click="handleLogin", color="info") {{$t("action.login")}}
    v-menu
      template(v-slot:activator="{ on }")
        v-btn.d-sm-none(icon, v-on="on")
          v-icon mdi-dots-vertical
      v-list
        v-list-item(@click="handleChange") {{$t("language")}}
        v-list-item(@click="handleLogin", color="info") {{$t("action.login")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BaseModule } from '@/store'

@Component
export default class HomeToolbar extends Vue {
  handleChange () {
    BaseModule.changeLocale()
  }
  handleLogin () {
    this.$router.push({ name: 'dashboard' })
  }
}
</script>

<style lang="stylus" scoped>

</style>
