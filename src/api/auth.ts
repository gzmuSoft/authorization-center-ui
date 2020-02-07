import authAxios from '@/api/index'

/**
 * Get user routes
 */
export const meRoutes = () => {
  return authAxios.request({
    url: '/me/routes',
    method: 'GET'
  })
}
