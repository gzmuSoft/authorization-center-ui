import { routerMap } from '@/router/route'
import { meRoutes } from '@/api/auth'
import { Module, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/store/types'

export interface RouteState {
  routes: Array<any>,
  hasGetRules: Boolean
}

const state: RouteState = {
  routes: [],
  hasGetRules: false
}

const getters: GetterTree<RouteState, RootState> = {
  //
}

const mutations: MutationTree<RouteState> = {
  SET_ROUTES (state, routerList) {
    state.routes = routerList
    state.hasGetRules = true
  },

  CHANGE_ROUTES (state, get) {
    state.hasGetRules = get
  }
}

const actions:ActionTree<RouteState, RootState> = {
  changeRoutes ({ commit }, get) {
    commit('CHANGE_ROUTES', get)
  },
  getRoutes ({ commit }): Promise<any> {
    return new Promise((resolve, reject) => {
      meRoutes().then(res => {
        const accessRouterList1 = accessRouterList(routerMap, res.data)
        commit('SET_ROUTES', accessRouterList1)
        resolve(accessRouterList1)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

const accessRouterList = (routes, rules) => {
  return routes.filter(item => {
    if (rules[item.name]) {
      if (item.children) item.children = accessRouterList(item.children, rules)
      return true
    }
    if (item.children) item.children = accessRouterList(item.children, rules)
    if (typeof (item.children) === 'undefined') return false
    return item.children.length > 0
  })
}

export const route: Module<RouteState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
