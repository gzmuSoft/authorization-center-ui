import authAxios from '@/api/index'

export const resPage = (params) => {
  return authAxios.request({
    url: '/res',
    method: 'GET',
    params: params
  })
}
