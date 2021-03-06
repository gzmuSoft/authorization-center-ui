<template lang="pug">
  v-dialog.student-admin-view(v-model="show", fullscreen, hide-overlay, transition="dialog-bottom-transition", scrollable)
    v-card(:loading="loading")
      v-toolbar(flat, color="primary", dark)
        v-toolbar-title {{$t("title.info")}}
        v-spacer
        v-tooltip(bottom)
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
              v-text-field(v-model="res.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')", :readonly="!res.edit",
                :hint="$t('entity.student.tip.idNumber')", counter="18", :rules="[required('entity.student.idNumber'), equalsLength(18)]")
            v-col(cols="12", sm="6", lg="3", v-if="res.id === null")
              v-text-field(v-model="res.email", ref="email", :label="$t('entity.user.email')", @blur="filedExist('email')",
                :rules="[required('entity.user.email'), rangeLength(4, 35), email()]", :loading="load.email")
            v-col(cols="12", sm="6", lg="3", v-if="res.id === null")
              v-text-field(v-model="res.phone", ref="phone", :label="$t('entity.user.phone')", @blur="filedExist('phone')",
                :rules="[required('entity.user.phone'), equalsLength(11)]", :loading="load.phone")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.workDate", ref="workDate", :label="$t('entity.teacher.workDate')", :readonly="!res.edit",
                :rules="[required('entity.teacher.workDate')]")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.birthday", ref="birthday", :label="$t('entity.student.birthday')", :readonly="!res.edit",
                :rules="[required('entity.student.birthday')]")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.academic", :items="types['6']", item-text="name", item-value="id",
                :label="$t('entity.student.academic')")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.nation", ref="nation", :label="$t('entity.teacher.nation')",
                :items="types['9']", item-text="name", item-value="id")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.profTitle", ref="profTitle", :label="$t('entity.teacher.profTitle')",
                :items="types['11']", item-text="name", item-value="id")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.profTitleAssDate", ref="profTitleAssDate", :label="$t('entity.teacher.profTitleAssDate')", :readonly="!res.edit")
            v-col(cols="12", sm="6", lg="3")
              v-select(v-model="res.degree", ref="degree", :label="$t('entity.teacher.degree')",
                :items="types['7']", item-text="name", item-value="id")
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
              v-text-field(v-model="res.major", ref="major", :label="$t('entity.student.originalMajor')", :readonly="!res.edit",
                counter="18", :rules="[maxLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              date-menu(v-model="res.graduationDate", ref="graduationDate", :label="$t('entity.student.graduationDate')", :readonly="!res.edit")
            v-col(cols="12", sm="6", lg="3")
              v-text-field(v-model="res.graduateInstitution", ref="graduateInstitution", :label="$t('entity.student.graduateInstitution')", :readonly="!res.edit",
                counter="18", :rules="[maxLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              v-text-field(v-model="res.subjectCategory", ref="subjectCategory", :label="$t('entity.teacher.subjectCategory')", :readonly="!res.edit",
                counter="18", :rules="[maxLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              v-text-field(v-model="res.majorResearch", ref="majorResearch", :label="$t('entity.teacher.majorResearch')", :readonly="!res.edit",
                counter="18", :rules="[maxLength(18)]")
            v-col(cols="12", sm="6", lg="3")
              v-switch(v-model="res.isAcademicLeader", :label="$t('entity.teacher.tip.isAcademicLeader', [res.isAcademicLeader?'是':'否'])")
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
          v-row(v-if="res.id !== null")
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
import TableAdminViewMixin from '@/plugins/TableAdminViewMixin'
import DateMenu from '@/components/DateMenu.vue'
import { teacherAdd, teacherUpdate } from '@/api/teacher'
@Component({
  components: { DateMenu }
})
export default class TeacherAdminView extends Mixins(TableAdminViewMixin) {
  async handleAction () {
    if (this.res.id === null) {
      await teacherAdd(this.res)
      this.$emit('create', this.res)
    } else {
      await teacherUpdate(this.res)
      this.$emit('update', this.res)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
