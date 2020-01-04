import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Dashboard.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "about" */ '@/views/index/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
