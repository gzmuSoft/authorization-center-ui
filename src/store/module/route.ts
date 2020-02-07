import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { routerMap } from '@/router/route'
import { meRoutes } from '@/api/auth'

export interface IRoute {
  routes: Array<any>,
  hasGetRules: Boolean
}

@Module({ namespaced: true, name: 'route' })
export default class Route extends VuexModule implements IRoute {
  routes: Array<any> = [];
  hasGetRules: Boolean = false;

  @Mutation
  SET_ROUTES (routerList) {
    this.routes = routerList
    this.hasGetRules = true
  }

  @Mutation
  CHANGE_ROUTES (get) {
    this.hasGetRules = get
  }

  @Action
  changeRoutes (get) {
    this.CHANGE_ROUTES(get)
  }

  @Action
  getRoutes () {
    return new Promise((resolve, reject) => {
      meRoutes().then(res => {
        this.SET_ROUTES(accessRouterList(routerMap, res.data))
        resolve(this.routes)
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
    return item.children.length > 0
  })
}
