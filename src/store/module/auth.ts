import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '@/store/types'

export interface AuthState {
  accessToken: String,
  refreshToken: String,
  expiresIn: Number,
  sub: String,
  userName: String,
  isTeacher: Boolean,
  isStudent: Boolean,
  authorities: Array<String>
}

const state: AuthState = {
  accessToken: null,
  authorities: null,
  expiresIn: null,
  isStudent: null,
  isTeacher: null,
  refreshToken: null,
  sub: null,
  userName: null
}

const getters: GetterTree<AuthState, RootState> = {
  isLogin (state): Boolean {
    return state.accessToken !== null
  },
  isAdmin (state): Boolean {
    return state.authorities.indexOf('ROLE_ADMIN') > -1
  }
}

const mutations: MutationTree<AuthState> = {
  SET_TOKEN (state, token) {
    if (token === null) {
      state.accessToken = null
      state.authorities = null
      state.expiresIn = null
      state.isStudent = null
      state.isTeacher = null
      state.refreshToken = null
      state.sub = null
      state.userName = null
      return
    }
    state.accessToken = token.access_token
    state.authorities = token.authorities
    state.expiresIn = token.expires_in
    state.isStudent = token.is_student
    state.isTeacher = token.is_teacher
    state.refreshToken = token.refresh_token
    state.sub = token.sub
    state.userName = token.user_name
  }
}

const actions:ActionTree<AuthState, RootState> = {
  oauthToken ({ commit }, token) {
    commit('SET_TOKEN', token)
  }
}

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
