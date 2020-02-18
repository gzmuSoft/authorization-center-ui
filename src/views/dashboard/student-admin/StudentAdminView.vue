<template lang="pug">
  v-dialog.student-admin-view(v-model="show", fullscreen, hide-overlay, transition="dialog-bottom-transition", scrollable)
    v-card(:loading="loading")
      v-toolbar(flat, color="primary", dark)
        v-toolbar-title {{$t("title.info")}}
        v-spacer
        v-tooltip(left)
          template(v-slot:activator="{ on }")
            v-btn(icon, v-on="on", @click="show = false")
              v-icon mdi-close
          span {{$t("action.close")}}
      v-card-text
        v-form(ref="form")
          v-row
            v-col(cols="12", md="6", lg="3")
              v-text-field(v-model="res.name", ref="name", :label="$t('entity.student.name')",
                :hint="$t('entity.student.tip.name')", persistent-hint, counter="18", :readondly="!res.edit",
                :rules="[required('entity.student.name'),maxLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.gender", ref="gender", :label="$t('entity.student.gender')", :items="gender",
                :append-icon="genderIcon", :rules="[required('entity.student.gender')]", :readonly="!res.edit")
            v-col(cols="12", sm="6", lg="3")
              v-text-field(v-model="res.no", ref="no", :label="$t('entity.student.no')", :readonly="!res.edit",
                :rules="[required('entity.student.no'), maxLength(18)]", counter="18")
            v-col(cols="12", sm="6", lg="3")
              v-text-field(v-model="res.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')", :readonly="!res.edit",
                :hint="$t('entity.student.tip.idNumber')", counter="18",
                :rules="[required('entity.teacher.nation'), equalsLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.enterDate", ref="enterDate", :label="$t('entity.student.enterDate')", :readonly="!res.edit",
                :rules="[required('entity.student.enterDate')]")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.birthday", ref="birthday", :label="$t('entity.student.birthday')", :readonly="!res.edit",
                :rules="[required('entity.student.birthday')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.academic", :items="types['6']", item-text="name", item-value="id",
                :label="$t('entity.student.academic')")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.nation", ref="nation", :label="$t('entity.teacher.nation')",
                :items="types['9']", item-text="name", item-value="id", :rules="[required('entity.teacher.nation')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.schoolId", ref="school", :label="$t('entity.student.school')",
                :items="types['0']", item-text="name", item-value="id", :rules="[required('entity.student.school')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.collegeId", ref="college", :label="$t('entity.student.college')",
                :items="colleges", item-text="name", item-value="id", :rules="[required('entity.student.college')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.depId", ref="dep", :label="$t('entity.student.dep')",
                :items="departments", item-text="name", item-value="id", :rules="[required('entity.student.dep')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.specialtyId", ref="specialty", :label="$t('entity.student.specialty')",
                :items="specialty", item-text="name", item-value="id", :rules="[required('entity.student.specialty')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.classesId", ref="classes", :label="$t('entity.student.classes')",
                :items="classes", item-text="name", item-value="id", :rules="[required('entity.student.classes')]")
            v-col.pt-8.pb-0(cols="12", sm="6", lg="3")
              v-slider(v-model="res.sort", :thumb-size="24", thumb-label)
                template(v-slot:prepend)
                  span(style="width:40px") {{$t('entity.base.sort')}}
                template(v-slot:append)
                  v-text-field.mt-0.pa-0(v-model="res.sort", single-line, type="number",
                    style="width:60px", :rules="[required('entity.base.sort')]")
            v-col(cols="12", md="6")
              v-text-field(v-model="res.remark", :label="$t('entity.base.remark')", counter="128",
                :rules="[maxLength(128)]")
          v-row
            v-col(cols="12", sm="6", lg="3")
              v-text-field(:value="res.createTime", :label="$t('entity.base.createTime')", disabled)
            v-col(cols="12", sm="6", lg="3")
              v-text-field(:value="res.createUser", :label="$t('entity.base.createUser')", disabled)
            v-col(cols="12", sm="6", lg="3")
              v-text-field(:value="res.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
            v-col(cols="12", sm="6", lg="3")
              v-text-field(:value="res.modifyUser", :label="$t('entity.base.modifyUser')", disabled)
      v-card-actions(v-if="res.edit")
        v-spacer
        v-btn.mr-5(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
        v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t("action.save")}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import StudentAdminMixin from './StudentAdminMixin'
import DateMenu from '@/components/DateMenu.vue'
import { State } from 'vuex-class'
import { studentUpdateComplete } from '@/api/student'

@Component({ components: { DateMenu } })
export default class StudentAdminView extends Mixins(FormValidateMixin, DialogViewMixin, StudentAdminMixin) {
  @State('types', { namespace: 'admin' })protected types!: any

  get colleges () {
    if (this.res.schoolId !== '') {
      const college: Array<any> = this.types['1']
      return this._.filter(college, { parentId: this.res.schoolId })
    } else {
      return []
    }
  }
  get departments () {
    if (this.res.collegeId !== '') {
      const department: Array<any> = this.types['2']
      return this._.filter(department, { parentId: this.res.collegeId })
    } else {
      return []
    }
  }
  get specialty () {
    if (this.res.depId !== '') {
      const specialty: Array<any> = this.types['3']
      return this._.filter(specialty, { parentId: this.res.depId })
    } else {
      return []
    }
  }
  get classes () {
    if (this.res.specialtyId !== '') {
      const classes: Array<any> = this.types['4']
      return this._.filter(classes, { parentId: this.res.specialtyId })
    } else {
      return []
    }
  }
  async handleSave () {
    this.loading = true
    studentUpdateComplete(this.res).then(() => {
      this.$toast.success(this.$t('tip.success'))
      this.show = false
      this.$emit('update', this.res)
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="stylus" scoped>

</style>