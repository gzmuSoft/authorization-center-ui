<template lang="pug">
  v-card.setting-entity
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.setting.entity')", :info="info")
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.name", ref="name", :label="$t('entity.student.name')",
              :hint="$t('entity.student.tip.name')", persistent-hint, counter="18",
              :rules="[required('entity.student.name'),maxLength(18)]")
          v-flex(sm12, md6)
            v-select(v-model="entity.gender", ref="gender", :label="$t('entity.student.gender')", :items="gender",
              :append-icon="genderIcon", :rules="[required('entity.student.gender')]")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')",
              :hint="$t('entity.student.tip.idNumber')", counter="18",
              :rules="[required('entity.teacher.nation'), equalsLength(18)]")
          v-flex(sm12, md6)
            date-menu(v-model="entity.birthday", ref="birthday", :label="$t('entity.student.birthday')")
          v-flex(sm12, md6)
            v-select(v-model="entity.nation", ref="nation", :label="$t('entity.teacher.nation')",
              :items="nation", item-text="name", item-value="id")
          v-flex(sm12, md6)
            date-menu(v-model="entity.workDate", ref="workDate", :label="$t('entity.teacher.workDate')")
          v-flex(sm12, md6)
            v-select(v-model="entity.degree", ref="degree", :label="$t('entity.teacher.degree')",
              :items="degree", item-text="name", item-value="id")
          v-flex(sm12, md6)
            v-select(v-model="entity.academic", :items="academic", item-text="name", item-value="id",
              :label="$t('entity.student.academic')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.graduationDate", ref="graduationDate", :label="$t('entity.student.graduationDate')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.graduateInstitution", :label="$t('entity.student.graduateInstitution')",
              :hint="$t('entity.student.tip.graduateInstitution')", counter="25",
              :rules="[maxLength(25)]")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.major", :label="$t('entity.student.originalMajor')", counter="25",
              :rules="[maxLength(25)]")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.majorResearch", :label="$t('entity.teacher.majorResearch')", counter="25",
              :rules="[maxLength(25)]")
          v-flex(sm12, md6)
            v-select(v-model="entity.profTitle", :items="profTitle", item-text="name", item-value="id",
              :label="$t('entity.teacher.profTitle')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.profTitleAssDate", ref="profTitleAssDate", :label="$t('entity.teacher.profTitleAssDate')", counter="25",
              :rules="[maxLength(25)]")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.subjectCategory", :label="$t('entity.teacher.subjectCategory')", counter="25",
              :rules="[maxLength(25)]")
          v-flex(sm12, md6)
            v-switch(v-model="entity.isAcademicLeader", :label="$t('entity.teacher.tip.isAcademicLeader', [entity.isAcademicLeader?'是':'否'])")
          v-subheader {{$t('entity.student.resume')}}
          v-flex(sm12, style="z-index: 0")
            mavon-editor(v-model="entity.resume", :language="locale", :placeholder="$t('entity.student.resume')",
              :toolbars="toolbars", :tabSize="4", :autofocus="false")
          v-flex(sm12, md6)
            v-text-field(:value="entity.createTime", :label="$t('entity.base.createTime')", disabled)
          v-flex(sm12, md6)
            v-text-field(:value="entity.modifyTime", :label="$t('entity.base.modifyTime')", disabled)
    v-card-actions
      v-spacer
      v-expand-transition
        .action(v-show="change")
          v-btn.mr-5(outlined, color="warning", @click="handleReset") {{$t("action.reset")}}
          v-btn(outlined, color="success", @click="handleSave", :loading="loading") {{$t("action.save")}}

</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import DateMenu from '@/components/DateMenu.vue'
import UserSettingFormMixin from './UserSettingFormMixin'
import FormValidateMixin from '@/plugins/FormValidateMixin'

@Component({
  components: { CardHeader, DateMenu }
})
export default class UserSettingEntity extends Mixins(UserSettingFormMixin, FormValidateMixin) {
  async created () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
