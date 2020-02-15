<template lang="pug">
  v-card.setting-entity
    v-card-title(style="height: 100px;")
      card-header(icon="mdi-account-box", :title="$t('title.setting.entity')", :info="info")
    v-card-text
      v-form(ref="form")
        v-row
          v-col(cols="12", sm="6")
            v-text-field(v-model="entity.name", ref="name", :label="$t('entity.student.name')",
              :hint="$t('entity.student.tip.name')", persistent-hint, counter="18",
              :rules="[required('entity.student.name'),maxLength(18)]")
          v-col(cols="12", sm="6")
            v-select(v-model="entity.gender", ref="gender", :label="$t('entity.student.gender')", :items="gender",
              :append-icon="genderIcon", :rules="[required('entity.student.gender')]")
          v-col(cols="12", sm="6")
            date-menu(v-model="entity.birthday", ref="birthday", :label="$t('entity.student.birthday')",
              :rules="[required('entity.student.birthday')]")
          v-col(cols="12", sm="6")
            v-select(v-model="entity.nation", ref="nation", :label="$t('entity.teacher.nation')",
              :items="nation", item-text="name", item-value="id", :rules="[required('entity.teacher.nation')]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="entity.idNumber", ref="idNumber", :label="$t('entity.student.idNumber')",
              :hint="$t('entity.student.tip.idNumber')", counter="18",
              :rules="[required('entity.student.idNumber'), equalsLength(18)]")
          v-col(cols="12", sm="6")
            v-text-field(v-model="entity.no", ref="no", :label="$t('entity.student.no')",
              :rules="[required('entity.student.no'), maxLength(18)]", counter="18")
          v-col(cols="12", sm="6")
            v-text-field(:value="entity.enterDate", :label="$t('entity.student.enterDate')", disabled)
          v-col(cols="12", sm="6")
            v-select(v-model="entity.academic", :items="academic", item-text="name", item-value="id",
              :label="$t('entity.student.academic')")
          v-col(cols="12", sm="6")
            date-menu(v-model="entity.graduationDate", ref="graduationDate", :label="$t('entity.student.graduationDate')")
          v-col(cols="12", sm="6")
            v-text-field(v-model="entity.graduateInstitution", :label="$t('entity.student.graduateInstitution')",
              :hint="$t('entity.student.tip.graduateInstitution')", counter="25",
              :rules="[maxLength(25)]")
          v-col(cols="12", sm="12")
            v-text-field(v-model="entity.originalMajor", :label="$t('entity.student.originalMajor')",
              :hint="$t('entity.student.tip.originalMajor')", counter="25",
              :rules="[maxLength(25)]")
          v-col(cols="12", sm="12")
            v-subheader {{$t('entity.student.resume')}}
            mavon-editor(v-model="entity.resume", :language="locale", :placeholder="$t('entity.student.resume')",
              :toolbars="toolbars", :tabSize="4", :autofocus="false")
          v-col(cols="12", sm="6")
            v-text-field(:value="entity.createTime", :label="$t('entity.base.createTime')", disabled)
          v-col(cols="12", sm="6")
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
}
</script>

<style lang="stylus" scoped>

</style>
