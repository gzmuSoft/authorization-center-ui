import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zh from '@/locales/vuetify/zh'
import en from '@/locales/vuetify/en'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { zh, en },
    current: 'zh'
  }
})
