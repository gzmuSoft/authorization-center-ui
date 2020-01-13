import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface IBase {
  theme: boolean,
  drawer: boolean
}
@Module({ namespaced: true, name: 'base' })
export default class Base extends VuexModule implements IBase {
  theme: boolean = true
  drawer: boolean = true

  @Mutation
  SET_THEME () {
    this.theme = !this.theme
  }
  @Mutation
  SET_DRAWER () {
    this.drawer = !this.drawer
  }

  @Action
  changeTheme () {
    this.SET_THEME()
  }

  @Action
  changeDrawer () {
    this.SET_DRAWER()
  }
}
