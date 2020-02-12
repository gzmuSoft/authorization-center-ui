<template lang="pug">
  v-card.res.mt-12
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.res')", :info="$t('tip.res.info')")
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(sm12, md6)
            v-text-field(v-model="search.describe", ref="des", :label="$t('entity.res.describe')",
              counter="18", :rules="[maxLength(18)]", clearable)
          v-flex(sm12, md6)
            v-select(v-model="search.type", ref="type", :label="$t('entity.res.type')",
              :items="resTypes", item-text="name", item-value="id")
          v-flex.text-right(sm12)
            v-btn(outlined, color="primary", @click="handleSearch") {{$t('action.search')}}
      v-data-table(:headers="headers", :items="items", :options.sync="options", :server-items-length="itemsLength",
        :footer-props="footer", :loading="load", multi-sort)
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import TableMixin from '@/plugins/TableMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { resTypes } from '@/utils/options'
import { resPage } from '@/api/page'

@Component({ components: { CardHeader } })
export default class Res extends Mixins(TableMixin, FormValidateMixin) {
  protected search = { describe: '', type: 0 }
  protected resTypes = resTypes

  get headers () {
    return [
      { text: this.$t('entity.res.describe'), align: 'left', value: 'describe' },
      { text: this.$t('entity.res.url'), align: 'left', value: 'url' },
      { text: this.$t('entity.res.method'), align: 'left', value: 'method' },
      { text: this.$t('entity.res.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.res.remark'), align: 'left', value: 'remark' }
    ]
  }

  getPage (option) {
    this.load = true
    resPage(option).then(res => {
      this.itemsLength = res.data.itemsLength
      this.items = res.data.content
    }).finally(() => { this.load = false })
  }
}
</script>

<style lang="stylus" scoped>

</style>
