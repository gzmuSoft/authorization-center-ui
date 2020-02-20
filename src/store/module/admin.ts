import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'
import { RootState } from '@/store/types'
import { dataByTypes } from '@/api/base'

export interface AdminState {
  types: any
}

const state: AdminState = {
  types: {}
}

const getters: GetterTree<AdminState, RootState> = {
  school (state) {
    return state.types['0']
  },
  college (state) {
    return state.types['1']
  },
  dep (state) {
    return state.types['2']
  },
  specialty (state) {
    return state.types['3']
  },
  classes (state) {
    return state.types['4']
  },
  academic (state) {
    return state.types['6']
  },
  degree (state) {
    return state.types['7']
  },
  nation (state) {
    return state.types['9']
  },
  professionalTitle (state) {
    return state.types['11']
  }
}

const mutations: MutationTree<AdminState> = {
  SET_TYPES (state, types) {
    state.types = types
  }
}

const actions:ActionTree<AdminState, RootState> = {
  getTypes ({ commit }) {
    dataByTypes([0, 1, 2, 3, 4, 6, 7, 9, 11])
      .then(res => { commit('SET_TYPES', res.data) })
  }
}

export const admin: Module<AdminState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
