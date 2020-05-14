<template lang="pug">
  v-card.res.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.res')", :info="$t('tip.res.info')")
    v-card-text
      v-skeleton-loader(:loading="init", transition="slide-y-transition", type="table")
        v-form(ref="form")
          v-layout(wrap, style="width:100%")
            v-flex(sm12, md6)
              v-text-field(v-model="search.describe", ref="des", :label="$t('entity.res.describe')",
                counter="18", :rules="[maxLength(18)]", clearable)
            v-flex(sm12, md6)
              v-select(v-model="search.type", ref="type", :label="$t('entity.res.type')",
                :items="resTypes", item-text="name", item-value="id")
            v-flex.text-right(sm12)
              v-btn.mr-4(outlined, color="success", @click="handleAdd") {{$t('action.add')}}
              v-btn(outlined, color="primary", @click="handleSearch") {{$t('action.search')}}
          v-data-table(:headers="headers", :items="items", :options.sync="options", :server-items-length="itemsLength",
            :footer-props="footer", :loading="load", multi-sort)
            template(v-slot:item.isEnable="{ item }")
              v-switch(:loading="item.loading", :disabled="item.disabled", v-model="item.isEnable",
                :true-value="true", :false-value="false", :value="item.isEnable", @click.stop="handleDelete(item)",
                :label="`${item.disabled === true? $t('action.wait') : item.isEnable ? $t('action.enable') : $t('action.disable') }`")
            template(v-slot:item.action="{ item }")
              v-tooltip(top)
                template(v-slot:activator="{ on }")
                  v-btn.mr-2(icon, x-small, fab, color="secondary", v-on="on", @click="handleView(item)")
                    v-icon mdi-pencil
                span {{$t('action.update')}}
    res-view(ref="view", :item="viewItem", @update="handleUpdate", @crate="handleSearch")
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import TableMixin from '@/plugins/TableMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import ResView from './ResView.vue'
import { resTypes } from '@/utils/options'
import { resPage } from '@/api/page'
import { resDelete } from '@/api/res'

@Component({ components: { CardHeader, ResView } })
export default class Res extends Mixins(TableMixin, FormValidateMixin) {
  protected search = { describe: '', type: 0 }
  protected resTypes = resTypes
  get headers () {
    return [
      { text: this.$t('entity.res.describe'), align: 'left', value: 'describe' },
      { text: this.$t('entity.res.url'), align: 'left', value: 'url' },
      { text: this.$t('entity.res.method'), align: 'left', value: 'method' },
      { text: this.$t('entity.base.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.remark'), align: 'left', value: 'remark' },
      { text: this.$t('entity.base.isEnable'), align: 'left', value: 'isEnable' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '70px' }
    ]
  }

  getPage (option) {
    if (!option.hasOwnProperty('sort')) {
      option = Object.assign(this.toPage(option), this.search)
    }
    this.load = true
    resPage(option).then(res => {
      this.items = []
      this.itemsLength = res.data.itemsLength
      res.data.content.forEach(v => {
        v['loading'] = false
        v['disabled'] = false
        v['user'] = false
        this.items.push(v)
      })
      this.init = false
    }).finally(() => {
      this.load = false
    })
  }

  handleAdd () {
    this.$refs.view.show = true
    this.viewItem = {
      id: null,
      name: null,
      url: null,
      describe: null,
      method: null,
      sort: 1,
      remark: null
    }
  }

  handleDelete (item) {
    item.loading = 'success'
    item.disabled = true
    item.isEnable = !item.isEnable
    resDelete(item.id)
      .catch(() => { item.isEnable = !item.isEnable })
      .finally(() => {
        item.disabled = false
        item.loading = false
      })
  }
}
</script>

<style lang="stylus" scoped>

</style>
