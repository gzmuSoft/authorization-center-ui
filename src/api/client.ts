import authAxios from '@/api/index'

export const client = () => {
  return authAxios.request({
    url: '/client',
    method: 'GET'
  })
}

export const clientUpdate = (data) => {
  return authAxios.request({
    url: '/client',
    method: 'POST',
    data: data
  })
}
