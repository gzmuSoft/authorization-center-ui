import i18n from '@/locales/i18n'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: i18n.t('base.name') },
    component: () => import(/* webpackChunkName: "home" */ '@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: i18n.t('base.title.login') },
    component: () => import(/* webpackChunkName: "Login" */ '@/views/auth/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    meta: { title: i18n.t('base.title.logout') },
    component: () => import(/* webpackChunkName: "Logout" */ '@/views/auth/Logout.vue')
  }
]

export const routerMap = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/index',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard'),
    children: [
      {
        path: 'index',
        name: 'index',
        meta: { title: i18n.t('menu.dashboard') },
        component: () => import(/* webpackChunkName: "main" */ '@/views/dashboard/main')
      },
      {
        path: 'system-setting',
        name: 'system-setting',
        meta: { title: i18n.t('title.setting.base') },
        component: () => import(/* webpackChunkName: "system-setting" */ '@/views/dashboard/system-setting')
      },
      {
        path: 'user-setting',
        name: 'user-setting',
        meta: { title: i18n.t('title.setting.entity') },
        component: () => import(/* webpackChunkName: "user-setting" */ '@/views/dashboard/user-setting')
      },
      {
        path: 'role',
        name: 'role',
        meta: { title: i18n.t('title.role') },
        component: () => import(/* webpackChunkName: "role" */ '@/views/dashboard/role')
      },
      {
        path: 'res',
        name: 'res',
        meta: { title: i18n.t('menu.res') },
        component: () => import(/* webpackChunkName: "res" */ '@/views/dashboard/res')
      },
      {
        path: 'college',
        name: 'college',
        meta: { title: i18n.t('menu.college') },
        component: () => import(/* webpackChunkName: "college" */ '@/views/dashboard/college')
      },
      {
        path: 'data',
        name: 'data',
        meta: { title: i18n.t('menu.data') },
        component: () => import(/* webpackChunkName: "college" */ '@/views/dashboard/data')
      },
      {
        path: 'semester',
        name: 'semester',
        meta: { title: i18n.t('menu.semester') },
        component: () => import(/* webpackChunkName: "semester" */ '@/views/dashboard/semester')
      },
      {
        path: 'client',
        name: 'client',
        meta: { title: i18n.t('menu.client') },
        component: () => import(/* webpackChunkName: "semester" */ '@/views/dashboard/client')
      },
      {
        path: 'user',
        name: 'user',
        meta: { title: i18n.t('menu.user') },
        component: () => import(/* webpackChunkName: "student" */ '@/views/dashboard/user')
      },
      {
        path: 'student',
        name: 'student',
        meta: { title: i18n.t('menu.student') },
        component: () => import(/* webpackChunkName: "student" */ '@/views/dashboard/student')
      },
      {
        path: 'teacher',
        name: 'teacher',
        meta: { title: i18n.t('menu.teacher') },
        component: () => import(/* webpackChunkName: "teacher" */ '@/views/dashboard/teacher')
      }
    ]
  }
]
