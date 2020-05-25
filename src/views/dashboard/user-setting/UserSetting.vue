<template lang="pug">
  #user-setting.mt-10
    v-row
      v-col.setting-left(cols="12", md="8")
        user-setting-student(v-if="isStudent")
        user-setting-teacher(v-if="isTeacher")
      v-col(cols="12", md="4")
        user-setting-base.mx-auto
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserSettingStudent from './UserSettingStudent.vue'
import UserSettingTeacher from './UserSettingTeacher.vue'
import UserSettingBase from './UserSettingBase.vue'
import { State } from 'vuex-class'
const auth = 'auth'

@Component({
  components: { UserSettingStudent, UserSettingTeacher, UserSettingBase }
})
export default class UserSetting extends Vue {
  @State('isStudent', { namespace: auth }) public isStudent!: Boolean
  @State('isTeacher', { namespace: auth }) public isTeacher!: Boolean
  created () {
    console.log(this.isStudent)
  }
}
</script>

<style lang="stylus" scoped>
@media (max-width: 960px)
  .setting-left
    margin-bottom 100px

</style>
