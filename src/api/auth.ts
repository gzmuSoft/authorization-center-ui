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

/**
 * Get user menu
 */
export const meMenu = () => {
  return authAxios.request({
    url: '/me/menu',
    method: 'GET'
  })
}
