<template lang="pug">
  v-toolbar
    v-toolbar-title
      span.title {{$t("base.school")}}
    v-spacer
    div.d-none.d-sm-flex
      v-btn(@click="handleChange") {{$i18n.locale === 'zh' ? 'English' : '中文'}}
      v-btn.ml-2(@click="handleLogin", color="info") {{$t("action.login")}}
    v-menu
      template(v-slot:activator="{ on }")
        v-btn.d-sm-none(icon, v-on="on")
          v-icon mdi-dots-vertical
      v-list
        v-list-item(@click="handleChange") {{$i18n.locale === 'zh' ? 'English' : '中文'}}
        v-list-item(@click="handleLogin", color="info") {{$t("action.login")}}

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HomeToolbar extends Vue {
  handleChange () {
    this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh'
    this.$vuetify.lang.current = this.$i18n.locale
  }
  handleLogin () {
    console.log(this.$route.query)
    this.$router.push({ name: 'dashboard' })
  }
}
</script>

<style lang="stylus" scoped>

</style>
