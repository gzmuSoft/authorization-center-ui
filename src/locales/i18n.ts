import Vue from 'vue'
import VueI18n, { LocaleMessages } from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages (): LocaleMessages {
  const locales = require.context('.', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}
const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'zh',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh',
  messages: loadLocaleMessages()
})

Vue.prototype.$t = (key: string) => {
  if (!key) return ''
  return i18n.t(key)
}

Vue.prototype.$t = (key: string, value) => {
  if (!key) return ''
  return i18n.t(key, value)
}

export default i18n
