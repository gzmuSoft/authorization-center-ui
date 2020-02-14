import authAxios from '@/api/index'

export const resPage = (params) => {
  return authAxios.request({
    url: '/res',
    method: 'GET',
    params: params
  })
}

export const dataPage = (params) => {
  return authAxios.request({
    url: '/data',
    method: 'GET',
    params: params
  })
}

export const semesterPage = (params) => {
  return authAxios.request({
    url: '/semester',
    method: 'GET',
    params: params
  })
}
