import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales/i18n'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import VuejsDialog from 'vuejs-dialog'
import mavonEditor from 'mavon-editor'
import _ from 'lodash'
import imgView from './plugins/img-view'
import 'vue-toastification/dist/index.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.prototype._ = _
Vue.use(imgView)
Vue.use(Toast)
Vue.use(VuejsDialog, {
  okText: i18n.t('action.ok'),
  cancelText: i18n.t('action.cancel')
})
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h: any) => h(App)
}).$mount('#app')
