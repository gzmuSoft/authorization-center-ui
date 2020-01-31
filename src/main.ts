import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales/i18n'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import VuejsDialog from 'vuejs-dialog'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'vue-toastification/dist/index.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.config.productionTip = false

Vue.use(Toast)
Vue.use(VuejsDialog)
Vue.use(PerfectScrollbar)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h: any) => h(App)
}).$mount('#app')
