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
import HomeToolbar from '@/views/home/HomeToolbar.vue'
import HomeBanner from '@/views/home/HomeBanner.vue'
import HomeInfo from '@/views/home/HomeInfo.vue'
import HomeDevelopment from '@/views/home/HomeDevelopment.vue'
import HomeFooter from '@/views/home/HomeFooter.vue'

@Component({
  components: { HomeToolbar, HomeBanner, HomeInfo, HomeFooter, HomeDevelopment }
})
export default class Home extends Vue {
  created () {
  }
}
</script>
