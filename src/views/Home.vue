<template lang="pug">
  .home
    home-toolbar
    v-content
      home-banner
      home-info
      home-development
      home-footer

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HomeToolbar from '@/components/home/HomeToolbar.vue'
import HomeBanner from '@/components/home/HomeBanner.vue'
import HomeInfo from '@/components/home/HomeInfo.vue'
import HomeDevelopment from '@/components/home/HomeDevelopment.vue'
import HomeFooter from '@/components/home/HomeFooter.vue'

@Component({
  components: { HomeToolbar, HomeBanner, HomeInfo, HomeFooter, HomeDevelopment }
})
export default class Home extends Vue {
}
</script>
