import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/locales/i18n'
import { routes } from './route'
import { setTitle } from '@/utils'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

const noAuth = routes.map(r => r.name)

router.beforeEach((to, from, next) => {
  to.meta !== null && setTitle(to.meta.title)
  if (noAuth.indexOf(to.name) > -1) {
    next()
    return
  }
  if (!store.getters['auth/isLogin']) {
    next({ name: 'home' })
    Vue.$toast.error(i18n.t('tip.login.error'))
    return
  }
  if (store.state.route.hasGetRules) {
    next()
    return
  }
  store.dispatch('route/getRoutes').then(routes => {
    // @ts-ignore
    if (!router.options.routes.includes(routes)) {
      router.addRoutes(routes)
    }
    next({ ...to, replace: true })
  }).catch(() => {
    next({ name: 'home' })
  })
})

export default router
