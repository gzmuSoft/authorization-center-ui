import Vue from 'vue'
import Vuex from 'vuex'
import { RootState } from './types'
import { user } from '@/store/module/user'
import { route } from '@/store/module/route'
import { base } from '@/store/module/base'
import { auth } from '@/store/module/auth'
import { admin } from '@/store/module/admin'
import createVuexAlong from 'vuex-along'
Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
  modules: {
    user,
    route,
    base,
    auth,
    admin
  },
  plugins: [createVuexAlong({
    name: 'auth-center',
    local: {
      list: ['user', 'base', 'auth']
    }
  })]
})

export default store
