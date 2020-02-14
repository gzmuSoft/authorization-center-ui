<template lang="pug">
  v-dialog.semester-view(v-model="show", max-width="900px")
    v-card(:loading="loading")
      v-card-title
        span {{$t("title.info")}}
        v-spacer
        v-tooltip(left)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-form(ref="form")
          v-row
            v-col(cols="12")
              v-text-field(v-model="res.name", :label="$t('entity.base.name')", counter="30",
                autofocus, single-line, :rules="[required('entity.base.name'), maxLength(30)]")
            v-col(cols="12", md="6")
              date-menu(v-model="res.startDate", ref="startDate", :label="$t('entity.semester.startDate')",
                :rules="[required('entity.semester.startDate')]")
            v-col(cols="12", md="6")
              date-menu(v-model="res.endDate", ref="endDate", :label="$t('entity.semester.endDate')",
                :rules="[required('entity.semester.endDate')]")
            v-col.pt-8.pb-0(cols="12")
              v-slider(v-model="res.sort", :thumb-size="24", thumb-label)
                template(v-slot:prepend)
                  span(style="width:40px") {{$t('entity.base.sort')}}
                template(v-slot:append)
                  v-text-field.mt-0.pa-0(v-model="res.sort", single-line, type="number",
                    style="width:60px", :rules="[required('entity.base.sort')]")
            v-col(cols="12", sm="6", v-if="res.id !== null")
              v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
            v-col(cols="12", sm="6", v-if="res.id !== null")
              v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
            v-col(cols="12")
              v-textarea(v-model="res.remark", :label="$t('entity.base.remark')", counter="128", rows="2",
                :rules="[maxLength(128)]")
      v-card-actions
        v-spacer
        v-btn.mr-2(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
        v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t('action.save')}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import DateMenu from '@/components/DateMenu.vue'
import { semesterCreate, semesterUpdate } from '@/api/semester'
@Component({
  components: { DateMenu }
})
export default class SemesterView extends Mixins(FormValidateMixin, DialogViewMixin) {
  async handleSave () {
    if (!this.$refs.form.validate()) return
    this.loading = true
    try {
      if (this.res.id === null) {
        await semesterCreate(this.res)
        this.$emit('create', this.res)
      } else {
        await semesterUpdate(this.res)
        this.$emit('update', this.res)
      }
      this.show = false
      this.$toast.success(this.$t('tip.success'))
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
