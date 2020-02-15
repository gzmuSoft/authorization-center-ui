<template lang="pug">
  v-dialog.student-view(v-model="show", max-width="900px")
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
            v-col(cols="12", md="6")
              v-text-field(v-model="res.name", ref="name", :label="$t('entity.student.name')",
                :hint="$t('entity.student.tip.name')", persistent-hint, counter="18", :readondly="!res.edit",
                :rules="[required('entity.student.name'),maxLength(18)]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.gender", ref="gender", :label="$t('entity.student.gender')",
                :append-icon="genderIcon", :rules="[required('entity.student.gender')]", :readonly="!res.edit")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.no", ref="no", :label="$t('entity.student.no')", :readonly="!res.edit",
                :rules="[required('entity.student.no'), maxLength(18)]", counter="18")
            v-col(cols="12", sm="6")
              date-menu(v-model="res.enterDate", ref="enterDate", :label="$t('entity.student.enterDate')", :readonly="!res.edit",
                :rules="[required('entity.student.enterDate')]")
            v-col(cols="12", sm="6")
              date-menu(v-model="res.birthday", ref="birthday", :label="$t('entity.student.birthday')", :readonly="!res.edit",
                :rules="[required('entity.student.birthday')]")
            v-col(cols="12", sm="6")
              v-text-field(v-model="res.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')", :readonly="!res.edit",
                :hint="$t('entity.student.tip.idNumber')", counter="18",
                :rules="[required('entity.teacher.nation'), equalsLength(18)]")
            v-col(cols="12", sm="6")
              v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
            v-col(cols="12", sm="6")
              v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
      v-card-actions(v-if="res.edit")
        v-spacer
        v-btn.mr-5(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
        v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t("action.save")}}
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import DateMenu from '@/components/DateMenu.vue'
import { studentPatch } from '@/api/student'

@Component({ components: { DateMenu } })
export default class StudentView extends Mixins(FormValidateMixin, DialogViewMixin) {
  get genderIcon () {
    return this.res.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }
  async handleSave () {
    if (!this.$refs.form.validate()) return
    this.loading = true
    studentPatch(this.res).then(() => {
      this.$toast.success(this.$t('tip.success'))
      this.$emit('update', this.res)
      this.show = false
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>
