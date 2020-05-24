import i18n from '@/locales/i18n'
import vuetify from '@/plugins/vuetify'
import { ActionTree, GetterTree, MutationTree, Module } from 'vuex'
import { RootState } from '@/store/types'

export interface BaseState {
  theme: boolean,
  drawer: boolean,
  locale: string,
  imgView: any
}

const state: BaseState = {
  theme: false,
  drawer: false,
  locale: 'zh',
  imgView: {
    show: false,
    img: ''
  }
}

const getters: GetterTree<BaseState, RootState> = {
  localeMarkdown (state) {
    return state.locale === 'zh' ? 'zh-CN' : 'en'
  }
}

const mutations: MutationTree<BaseState> = {
  CHANGE_IMG (state, img) {
    state.imgView.show = !state.imgView.show
    state.imgView.img = img
  },
  SET_THEME (state) {
    state.theme = !state.theme
    vuetify.framework.theme.dark = state.theme
  },
  SET_DRAWER (state) {
    state.drawer = !state.drawer
  },
  CHANGE_LOCALE (state) {
    state.locale = state.locale === 'zh' ? 'en' : 'zh'
    i18n.locale = i18n.locale === 'zh' ? 'en' : 'zh'
    vuetify.framework.lang.current = i18n.locale
  }
}

const actions:ActionTree<BaseState, RootState> = {
  changImg ({ commit }, img) {
    commit('CHANGE_IMG', img)
  },
  changeTheme ({ commit }) {
    commit('SET_THEME')
  },
  changeDrawer ({ commit }) {
    commit('SET_DRAWER')
  },
  changeLocale ({ commit }) {
    commit('CHANGE_LOCALE')
  }
}

export const base: Module<BaseState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
