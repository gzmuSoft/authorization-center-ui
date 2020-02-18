import authAxios from '@/api/index'

export const userOne = (id) => {
  return authAxios.request({
    url: `/user/${id}`,
    method: 'GET'
  })
}

export const resetPassword = (data) => {
  return authAxios.request({
    url: '/user/password',
    method: 'PATCH',
    data: data
  })
}

export const userUpdate = (user) => {
  return authAxios.request({
    url: '/user',
    method: 'PATCH',
    data: user
  })
}
