import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface IBase {
  theme: boolean
}
@Module({ namespaced: true, name: 'base' })
export default class Base extends VuexModule implements IBase {
  theme: boolean = true
  @Mutation
  SET_THEME () {
    this.theme = !this.theme
  }
  @Action
  changTheme () {
    this.SET_THEME()
  }
}
