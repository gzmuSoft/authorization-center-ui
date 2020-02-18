<template lang="pug">
  v-card.semester
    v-card-title
      v-slide-group(v-model="school", show-arrows)
        v-slide-item(v-for="school in schools", :key="school.id", mandatory, v-slot:default="{ active, toggle }")
          v-btn.mx-2(:input-value="active", active-class="secondary", depressed, rounded, @click="toggle")
            | {{school.name}}
    v-card-text
      v-form(ref="form")
        v-row
          v-col(cols="12")
            v-text-field(v-model="search.name", ref="name", :label="$t('entity.base.name')",
              counter="18", :rules="[maxLength(18)]", clearable)
          v-col.text-right(cols="12")
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
        template(v-slot:item.isEnable="{ item }")
          v-switch(:loading="item.loading", :disabled="item.disabled", v-model="item.isEnable",
            :true-value="true", :false-value="false", :value="item.isEnable", @click.stop="handleStatus(item)",
            :label="`${item.disabled === true? $t('action.wait') : item.isEnable ? $t('action.enable') : $t('action.disable') }`")
      semester-view(ref="view", :item="viewItem", @update="handleUpdate", @create="handleSearch")
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator'
import { dataByType } from '@/api/base'
import TableMixin from '@/plugins/TableMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import { semesterPage } from '@/api/page'
import SemesterView from '@/views/dashboard/semester/SemesterView.vue'
import { semesterUpdate } from '@/api/semester'
@Component({ components: { SemesterView } })
export default class Semester extends Mixins(TableMixin, FormValidateMixin) {
  private schools = []
  private school = 0
  protected search = { name: '' }

  get headers () {
    return [
      { text: this.$t('entity.base.name'), align: 'left', value: 'name' },
      { text: this.$t('entity.semester.startDate'), align: 'left', value: 'startDate' },
      { text: this.$t('entity.semester.endDate'), align: 'left', value: 'endDate' },
      { text: this.$t('entity.base.sort'), align: 'middle', value: 'sort' },
      { text: this.$t('entity.base.isEnable'), align: 'left', value: 'isEnable' },
      { text: this.$t('title.action'), align: 'center', value: 'action', sortable: false, width: '60px' }
    ]
  }

  async created () {
    const res = await dataByType(0)
    this.schools = res.data
    if (this.schools.length > 0) {
      this.school = 0
      await this.getPage(this.options)
    }
  }

  @Watch('school')
  schoolChange () {
    this.getPage(this.options)
  }

  handleAdd () {
    this.$refs.view.show = true
    this.viewItem = {
      id: null,
      name: null,
      endDate: null,
      startDate: null,
      schoolId: this.schools[this.school].id,
      sort: 1,
      isEnable: true,
      remark: null
    }
  }
  async getPage (option) {
    if (typeof (this.schools[this.school]) === 'undefined') return
    this.load = true
    try {
      option.schoolId = this.schools[this.school].id
      const res = await semesterPage(option)
      res.data.content.forEach(v => {
        v.loading = false
        v.disabled = false
        this.items.push(v)
      })
      this.itemsLength = res.data.itemsLength
    } finally {
      this.load = false
    }
  }
  handleStatus (item) {
    item.loading = 'success'
    item.disabled = true
    item.isEnable = !item.isEnable
    semesterUpdate(item)
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
