<template lang="pug">
  v-card.data
    v-card-text
      v-toolbar(flat, color="primary", dark)
        v-toolbar-title {{$t('menu.data')}}
      v-tabs(:vertical="vertical", v-resize="onResize", show-arrows)
        v-tab(v-for="item in types", :key="item.type")
          v-icon(left) {{item.icon}}
          | {{$t(item.title)}}
        v-tab-item(v-for="item in types", :key="item.type")
          data-table(:type="item.type")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DataTable from './DataTable.vue'

@Component({ components: { DataTable } })
export default class Data extends Vue {
  private types = [
    { icon: 'mdi-lock', title: 'title.academic', type: 6 },
    { icon: 'mdi-lock', title: 'title.degree', type: 7 },
    { icon: 'mdi-lock', title: 'title.nation', type: 9 },
    { icon: 'mdi-lock', title: 'title.professionalTitle', type: 11 }
  ]
  private vertical = true
  onResize () {
    this.vertical = window.innerWidth >= 600
  }
}
</script>

<style lang="stylus" scoped>

</style>
