import authAxios from '@/api/index'

export const client = () => {
  return authAxios.request({
    url: '/client',
    method: 'GET'
  })
}
