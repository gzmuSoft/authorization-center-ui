<template lang="pug">
  .role-res
    v-simple-table
      tbody
        tr
          td {{$t("entity.res.describe")}}
          td {{$t("entity.base.name")}}
          td {{$t("entity.res.url")}}
        tr(v-for="(r, index) in res", :key="index")
          td {{r.describe}}
          td {{r.name}}
          td {{r.url}}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { roleRes } from '@/api/role'

@Component
export default class RoleRes extends Vue {
  @Prop({ type: Object }) default!: any
  private res = []

  created () {
    this.initData(this.default.id)
  }

  initData (id) {
    roleRes(id).then(res => {
      this.res = res.data
    })
  }

  @Watch('default')
  roleChange (val) {
    this.initData(val.id)
  }
}
</script>

<style lang="stylus" scoped>

</style>
