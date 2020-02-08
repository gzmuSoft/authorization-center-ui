import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zh from '@/locales/vuetify/zh'
import en from '@/locales/vuetify/en'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { zh, en },
    current: 'zh'
  },
  theme: {
    themes: {
      light: {
        primary: colors.blue.darken1,
        secondary: colors.indigo.lighten1,
        accent: colors.pink.lighten1,
        error: colors.red.lighten1,
        warning: colors.orange.lighten1,
        info: colors.lightBlue.lighten1,
        success: colors.lightGreen.lighten1,
        third: colors.green.base
      },
      dark: {
        primary: colors.red.darken1,
        secondary: colors.blue.darken1,
        accent: colors.amber.darken1,
        error: colors.red.accent3,
        warning: colors.orange.darken3,
        info: colors.blue.accent1,
        success: colors.lightGreen.darken1,
        next: colors.lightGreen.darken1,
        third: colors.blue.darken1
      }
    }
  }
})
