<template lang="pug">
  #user-setting.mt-10
    v-row
      v-col(cols="12", md="8")
        user-setting-student(v-if="auth.isStudent")
        user-setting-teacher(v-if="auth.isTeacher")
      v-col(cols="12", md="4")
        user-setting-base
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AuthModule } from '@/store'
import UserSettingStudent from './UserSettingStudent.vue'
import UserSettingTeacher from './UserSettingTeacher.vue'
import UserSettingBase from './UserSettingBase.vue'
import Auth from '@/store/module/auth'

@Component({
  components: { UserSettingStudent, UserSettingTeacher, UserSettingBase }
})
export default class UserSetting extends Vue {
  auth: Auth = AuthModule
  created () { }
}
</script>

<style lang="stylus" scoped>

</style>
