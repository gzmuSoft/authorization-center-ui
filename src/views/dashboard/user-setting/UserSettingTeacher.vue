<template lang="pug">
  v-card.setting-entity
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.setting.entity')", :info="info")
    v-card-text
      v-form(ref="form")
        v-layout(wrap, style="width:100%")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.name", ref="name", :label="$t('entity.student.name')",
              :hint="$t('entity.student.tip.name')", persistent-hint)
          v-flex(sm12, md6)
            v-select(v-model="entity.gender", ref="gender", :label="$t('entity.student.gender')", :items="options.gender",
              :append-icon="genderIcon")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')",
              :hint="$t('entity.student.tip.idNumber')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.birthday", ref="birthday", :label="$t('entity.student.birthday')")
          v-flex(sm12, md6)
            v-select(v-model="entity.nation", ref="nation", :label="$t('entity.teacher.nation')",
              :items="options.nation", item-text="name", item-value="id")
          v-flex(sm12, md6)
            v-select(v-model="entity.degree", ref="degree", :label="$t('entity.teacher.degree')",
              :items="options.degree", item-text="name", item-value="id")
          v-flex(sm12, md6)
            v-select(v-model="entity.academic", :items="options.academic", item-text="name", item-value="id",
              :label="$t('entity.student.academic')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.graduationDate", ref="graduationDate", :label="$t('entity.student.graduationDate')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.graduateInstitution", :label="$t('entity.student.graduateInstitution')",
              :hint="$t('entity.student.tip.graduateInstitution')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.major", :label="$t('entity.student.originalMajor')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.majorResearch", :label="$t('entity.teacher.majorResearch')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.workDate", ref="workDate", :label="$t('entity.teacher.workDate')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.profTitle", :label="$t('entity.teacher.profTitle')")
          v-flex(sm12, md6)
            date-menu(v-model="entity.profTitleAssDate", ref="profTitleAssDate", :label="$t('entity.teacher.profTitleAssDate')")
          v-flex(sm12, md6)
            v-text-field(v-model="entity.subjectCategory", :label="$t('entity.teacher.subjectCategory')")
          v-flex(sm12, md6)
            v-switch(v-model="entity.isAcademicLeader", :label="$t('entity.teacher.tip.isAcademicLeader', [entity.isAcademicLeader?'是':'否'])")
          v-subheader {{$t('entity.student.resume')}}
          v-flex(sm12, style="z-index: 0")
            mavon-editor(v-model="entity.resume", :language="locale", :placeholder="$t('entity.student.resume')",
              :toolbars="toolbars", :tabSize="4")
          v-flex(sm12, md6)
            v-text-field(:value="entity.createTime", :label="$t('entity.base.createTime')", disabled)
          v-flex(sm12, md6)
            v-text-field(:value="entity.modifyTime", :label="$t('entity.base.createTime')", disabled)
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import CardHeader from '@/components/CardHeader.vue'
import DateMenu from '@/components/DateMenu.vue'
import UserSettingFormMixin from './UserSettingFormMixin'

@Component({
  components: { CardHeader, DateMenu }
})
export default class UserSettingEntity extends Mixins(UserSettingFormMixin) {
  async created () {
  }
}
</script>

<style lang="stylus" scoped>

</style>
