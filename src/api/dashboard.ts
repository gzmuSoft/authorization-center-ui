import authAxios from '@/api/index'

export const dashboardDate = () =>
  authAxios.request({
    url: '/dashboard/date'
  })

export const dashboard = () =>
  authAxios.request({
    url: '/dashboard'
  })
