<template lang="pug">
  .home
    v-toolbar
      v-toolbar-title
        span.title {{$t("base.school")}}
      v-spacer
      v-btn(@click="handleChange") {{$i18n.locale === 'zh' ? 'English' : '中文'}}
    v-content
      home-banner
      home-info
      home-development
      home-footer

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeBanner from '@/components/home/HomeBanner.vue'
import HomeInfo from '@/components/home/HomeInfo.vue'
import HomeDevelopment from '@/components/home/HomeDevelopment.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'

@Component({
  components: { HomeBanner, HomeInfo, HomeFooter, HomeDevelopment }
})
export default class Home extends Vue {
  handleChange () {
    this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh'
    this.$vuetify.lang.current = this.$i18n.locale
  }
}
</script>
