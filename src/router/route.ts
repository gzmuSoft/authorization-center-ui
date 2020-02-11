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
        component: () => import(/* webpackChunkName: "SystemSetting" */ '@/views/dashboard/system-setting')
      },
      {
        path: 'user-setting',
        name: 'user-setting',
        meta: { title: i18n.t('title.setting.entity') },
        component: () => import(/* webpackChunkName: "SystemSetting" */ '@/views/dashboard/user-setting')
      },
      {
        path: 'role',
        name: 'role',
        meta: { title: i18n.t('title.role') },
        component: () => import(/* webpackChunkName: "SystemSetting" */ '@/views/dashboard/role')
      }
    ]
  }
]
