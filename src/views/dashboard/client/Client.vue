<template lang="pug">
  .client
    v-sheet.mx-auto(elevation="3")
      v-btn(color="accent", fab, fixed, dark, right, @click="handleAdd")
        v-icon mdi-plus
      v-slide-y-transition(mode="out-in")
        skeleton-client.ma-4(v-if="init", :num="8")
        v-slide-group.pa-4(v-else, v-model="active", show-arrows)
          v-slide-item(v-for="c in client", :key="c.id", v-slot:default="{ active, toggle }")
            v-card.item-card.ma-4.d-flex.align-center.text-center(height="200", width="300",
              @click="toggle", :color="active? 'secondary' : 'fourth'", dark)
              v-badge.mx-auto(:color="c.isEnable? 'success' : 'error'",
                :content="$t(`action.${c.isEnable?'enable':'disable'}`)")
                .display-1.flex-grow-1.text-center {{c.name}}
      v-expand-transition
        client-view.pa-10(v-if="edit", :item="view", @success="handleSuccess")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { client } from '@/api/client'
import ClientView from './ClientView.vue'
import SkeletonClient from '@/components/skeleton-loader/SkeletonClient.vue'
@Component({
  components: { SkeletonClient, ClientView }
})
export default class Client extends Vue {
  private client = []
  private active = null
  private view = {}
  private init = true
  private edit = false
  created () {
    this.initData()
  }
  initData () {
    client().then(res => {
      this.client = []
      res.data.forEach(v => {
        v.grantTypes = v.grantTypes.split(',')
        this.client.push(v)
      })
      this.init = false
    })
  }
  @Watch('active')
  changActive (val) {
    if (typeof (val) === 'undefined') {
      this.edit = false
      return
    }
    this.view = this.client[val]
    this.edit = true
  }
  handleAdd () {
    this.view = {
      id: null,
      spell: '',
      clientSecret: '',
      isEnable: true,
      sort: 1,
      name: null,
      clientId: null,
      resourceIds: null,
      scope: 'READ',
      grantTypes: null,
      redirectUrl: null,
      accessTokenValidity: null,
      refreshTokenValidity: null,
      remark: null
    }
    this.edit = true
  }
  handleSuccess (res) {
    if (res.id === null) {
      this.initData()
      this.edit = false
    } else {
      this.view = res
      const index = this._.findIndex(this.client, { id: res.id })
      this.client.splice(index, 1, res)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item-card
  transition background-color .5s
</style>
