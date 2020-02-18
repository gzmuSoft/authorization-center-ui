import authAxios from '@/api/index'

export const userOne = (id) => {
  return authAxios.request({
    url: `/user/${id}`,
    method: 'GET'
  })
}
