import authAxios from '@/api/index'

export const dataType = (type) => {
  return authAxios.request({
    url: `/data/type/${type}`,
    method: 'GET'
  })
}

export const dataParent = (parent) => {
  return authAxios.request({
    url: `/data/parent/${parent}`,
    method: 'GET'
  })
}

export const dataUpdate = (college) => {
  return authAxios.request({
    url: '/data',
    method: 'PATCH',
    data: college
  })
}

export const dataCreate = (college) => {
  return authAxios.request({
    url: '/data',
    method: 'POST',
    data: college
  })
}

export const dataDelete = (id) => {
  return authAxios.request({
    url: `/data/${id}`,
    method: 'DELETE'
  })
}
