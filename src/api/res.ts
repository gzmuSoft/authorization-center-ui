import authAxios from '@/api/index'

export const resUpdate = (res) => {
  return authAxios.request({
    url: '/res',
    method: 'PATCH',
    data: res
  })
}

export const resCreate = (res) => {
  return authAxios.request({
    url: '/res',
    method: 'POST',
    data: res
  })
}

export const resDelete = (id) => {
  return authAxios.request({
    url: `/res/${id}`,
    method: 'DELETE'
  })
}
