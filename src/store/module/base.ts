import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
export interface IBase {
  drawer: Boolean
}
@Module({ dynamic: true, namespaced: true, name: 'base', store })
class Base extends VuexModule {

}

export const BaseModule = getModule(Base)
