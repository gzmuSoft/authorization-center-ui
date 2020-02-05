import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface IAuth {
  accessToken: String,
  refreshToken: String,
  expiresIn: Number,
  sub: String,
  userName: String,
  isTeacher: Boolean,
  isStudent: Boolean,
  authorities: Array<String>
}

@Module({ namespaced: true, name: 'auth' })
export default class Auth extends VuexModule implements IAuth {
  accessToken: String = null;
  authorities: Array<String> = null;
  expiresIn: Number = null;
  isStudent: Boolean = null;
  isTeacher: Boolean = null;
  refreshToken: String = null;
  sub: String = null;
  userName: String = null;

  get isLogin () {
    return this.accessToken !== null
  }

  @Mutation
  SET_TOKEN (token) {
    if (token === null) {
      this.accessToken = null
      this.authorities = null
      this.expiresIn = null
      this.isStudent = null
      this.isTeacher = null
      this.refreshToken = null
      this.sub = null
      this.userName = null
      return
    }
    this.accessToken = token.access_token
    this.authorities = token.authorities
    this.expiresIn = token.expires_in
    this.isStudent = token.is_student
    this.isTeacher = token.is_teacher
    this.refreshToken = token.refresh_token
    this.sub = token.sub
    this.userName = token.user_name
  }

  @Action
  oauthToken (token) {
    this.SET_TOKEN(token)
  }
}
