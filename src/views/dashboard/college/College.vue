<template lang="pug">
  v-card.college
    v-card-text
      v-row
        v-col(sm="12", md="4", xl="3")
          v-treeview(:items="college", activatable, :load-children.sync="handleCollege", hoverable,
            item-key="id", transition, return-object, :open.sync="open", @update:active="handleActive",
            :active.sync="actives")
        v-col
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            .title.grey--text.text--lighten-1.font-weight-light.text-center(v-if="active === null")
              | {{$t("tip.res.empty")}}
          v-scroll-y-transition(hide-on-leave, mode="out-in")
            college-view(:item="active", v-if="active !== null", @add="handleAdd", @success="handleSave")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { dataParent, dataType } from '@/api/data'
import CollegeView from './CollegeView.vue'

@Component({ components: { CollegeView } })
export default class College extends Vue {
  private college = []
  private open = []
  private actives = []
  private active = null
  created () {
    this.initData()
  }
  initData () {
    dataType(0).then(res => {
      this.college = []
      this.actives = []
      this.open = []
      res.data.forEach(role => {
        role.children = []
        this.college.push(role)
      })
    })
  }
  handleActive (item) {
    this.active = null
    if (item.length !== 0) {
      this.active = item[0]
    }
  }
  async handleCollege (item) {
    const res = await dataParent(item.id)
    res.data.forEach(c => {
      if (c.type !== 4) {
        c.children = []
      }
      item.children.push(c)
    })
  }
  handleAdd (item) {
    this.active = null
    this.active = {
      id: null,
      parentId: item.id,
      type: item.type === 4 ? 4 : item.type + 1,
      isEnable: true
    }
  }
  handleSave (item) {
    this.college = []
    this.active = null
    this.initData()
  }
}
</script>

<style lang="stylus" scoped>

</style>
