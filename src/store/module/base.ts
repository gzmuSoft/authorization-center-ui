import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import i18n from '@/locales/i18n'
import vuetify from '@/plugins/vuetify'

export interface IBase {
  theme: boolean,
  drawer: boolean,
  locale: string
}
@Module({ namespaced: true, name: 'base' })
export default class Base extends VuexModule implements IBase {
  theme: boolean = true
  drawer: boolean = true
  locale: string = 'zh'

  @Mutation
  SET_THEME () {
    this.theme = !this.theme
    vuetify.framework.theme.dark = this.theme
  }
  @Mutation
  SET_DRAWER () {
    this.drawer = !this.drawer
  }
  @Mutation
  CHANGE_LOCALE () {
    this.locale = this.locale === 'zh' ? 'en' : 'zh'
    i18n.locale = i18n.locale === 'zh' ? 'en' : 'zh'
    vuetify.framework.lang.current = i18n.locale
  }
  @Action
  changeTheme () {
    this.SET_THEME()
  }
  @Action
  changeDrawer () {
    this.SET_DRAWER()
  }
  @Action
  changeLocale () {
    this.CHANGE_LOCALE()
  }
}
