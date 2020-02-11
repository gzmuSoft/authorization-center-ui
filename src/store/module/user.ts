import { oauthMe } from '@/api/oauth'
import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/store/types'

export interface UserState {
  name: String,
  email: String,
  avatar: String,
  image: String,
  phone: String
}

const state: UserState = {
  name: null,
  email: null,
  image: null,
  avatar: null,
  phone: null
}

const getters: GetterTree<UserState, RootState> = {
  //
}

const mutations: MutationTree<UserState> = {
  SET_USER (state, user) {
    state.avatar = user.avatar
    state.email = user.email
    state.image = user.image
    state.name = user.name
    state.phone = user.phone
  }
}

const actions:ActionTree<UserState, RootState> = {
  getUser ({ commit }): void {
    oauthMe().then(res => {
      commit('SET_USER', res.data)
    })
  }
}

export const user: Module<UserState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
