import Vue from 'vue'
import Vuex from 'vuex'
import { IBase } from '@/store/module/base'
Vue.use(Vuex)

export interface IRootState {
  base: IBase
}

export default new Vuex.Store<IRootState>({})
