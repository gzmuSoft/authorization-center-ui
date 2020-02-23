<template lang="pug">
  v-card.data-table(flat)
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(sm12, md8)
            v-text-field(v-model="search.name", ref="name", :label="$t('entity.base.name')",
              counter="18", :rules="[maxLength(18)]", clearable)
          v-flex.text-right(sm12, md4)
            .mt-5
              v-btn.mr-4(outlined, color="success", @click="handleAdd") {{$t('action.add')}}
              v-btn(outlined, color="primary", @click="handleSearch") {{$t('action.search')}}
      v-data-table(:headers="headers", :items="items", :options.sync="options", :server-items-length="itemsLength",
        :footer-props="footer", :loading="load", multi-sort)
        template(v-slot:item.action="{ item }")
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="secondary", v-on="on", @click="handleView(item)")
                v-icon mdi-pencil
            span {{$t('action.update')}}
          v-tooltip(top)
            template(v-slot:activator="{ on }")
              v-btn.mr-2(icon, x-small, fab, color="error", v-on="on", @click="handleDelete(item)")
                v-icon mdi-delete
            span {{$t('action.delete')}}
      data-view(ref="view", :item="viewItem", @update="handleUpdate", @create="handleSearch")
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import TableMixin from '@/plugins/TableMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DataView from './DataView.vue'
import { dataPage } from '@/api/page'
import { dataDelete } from '@/api/data'

@Component({ components: { DataView } })
export default class DataTable extends Mixins(TableMixin, FormValidateMixin) {
  @Prop(Number) private type !: Number
  protected search = { name: '' }

  get headers () {
    return [
      { text: this.$t('entity.base.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.sysData.brief'), align: 'left', value: 'brief' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.remark'), align: 'left', value: 'remark' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '120px' }
    ]
  }

  getPage (option) {
    this.load = true
    option.type = this.type
    dataPage(option).then(res => {
      this.items = res.data.content
      this.itemsLength = res.data.itemsLength
    }).finally(() => {
      this.load = false
    })
  }
  handleAdd () {
    this.$refs.view.show = true
    this.viewItem = {
      id: null,
      name: null,
      brief: null,
      type: this.type,
      parentId: 0,
      sort: 1,
      remark: null
    }
  }
  handleDelete (item) {
    this.$dialog
      .confirm(this.$t('tip.delete'))
      .then(() => {
        dataDelete(item.id).then(() => {
          this.$toast.success(this.$t('tip.success'))
          this.handleSearch()
        })
      })
      .catch(() => {})
  }
}
</script>

<style lang="stylus" scoped>

</style>
