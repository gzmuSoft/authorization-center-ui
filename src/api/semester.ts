import authAxios from '@/api/index'

export const semesterUpdate = (data) => {
  return authAxios.request({
    url: '/semester',
    method: 'PATCH',
    data: data
  })
}

export const semesterCreate = (data) => {
  return authAxios.request({
    url: '/semester',
    method: 'POST',
    data: data
  })
}
