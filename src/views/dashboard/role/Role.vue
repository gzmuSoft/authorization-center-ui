<template lang="pug">
  v-card.role
    v-card-text
      v-slide-y-transition(mode="out-in")
        skeleton-role(v-if="init")
        v-row(v-else)
          v-col(sm="12", md="4", xl="3")
            v-treeview(:items="roles", activatable, :load-children.sync="handleRole", hoverable,
              item-key="id", transition, return-object, @update:active="handleActive", :open.sync="open",
              :active.sync="actives")
              template(v-slot:prepend="{ item }")
                v-icon(size="20") {{item.iconCls }}
          v-col
            v-scroll-y-transition(hide-on-leave, mode="out-in")
              .title.grey--text.text--lighten-1.font-weight-light.text-center(v-if="active === null")
                | {{$t("tip.role.empty")}}
            v-scroll-y-transition(hide-on-leave, mode="out-in")
              .pt-6.mx-auto(v-if="active !== null")
                v-tabs(v-model="tab")
                  v-tab 基础信息
                  v-tab 资源信息
                  v-tab-item
                    role-view(:default="active", @success="updateRole", @add="handleAddChildren")
                  v-tab-item
                    role-res(:default="active")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import RoleView from './RoleView.vue'
import RoleRes from './RoleRes.vue'
import { roleParent } from '@/api/role'
import SkeletonRole from '@/components/skeleton-loader/SkeletonRole.vue'

@Component({ components: { SkeletonRole, RoleView, RoleRes } })
export default class Role extends Vue {
  private roles = []
  private open = []
  private actives = []
  private active = null
  private tab = null
  private init = true
  created () {
    this.initData()
  }
  initData () {
    roleParent(0).then(res => {
      this.roles = []
      this.actives = []
      this.open = []
      this.active = null
      res.data.forEach(role => {
        role.children = []
        this.roles.push(role)
      })
      this.init = false
    })
  }
  async handleRole (item) {
    const res = await roleParent(item.id)
    res.data.forEach(role => {
      role.children = []
      item.children.push(role)
    })
  }
  handleActive (item) {
    if (item.length === 0) {
      this.active = null
    } else {
      this.active = item[0]
    }
  }
  updateRole (item) {
    this.active = item
  }
  handleAddChildren () {
    this.active = {
      parent_id: this.active.id,
      id: null
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
