import authAxios from '@/api/index'

/**
 * Update user info.
 * @param user
 */
export const updateUser = (user) => {
  return authAxios.request({
    url: '/me/user',
    method: 'PATCH',
    data: user
  })
}
