import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/auth/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: "home" */ '@/views/auth/Logout.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "main" */ '@/views/dashboard/main')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
