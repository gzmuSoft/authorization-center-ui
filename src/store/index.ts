import Vue from 'vue'
import Vuex from 'vuex'
import Base from '@/store/module/base'
import Auth from '@/store/module/auth'
import createVuexAlong from 'vuex-along'
import { getModule } from 'vuex-module-decorators'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    base: Base,
    auth: Auth
  },
  plugins: [createVuexAlong({
    name: 'auth-center',
    local: {
      list: ['base', 'auth']
    }
  })]
})
export default store
export const BaseModule = getModule(Base, store)
export const AuthModule = getModule(Auth, store)
