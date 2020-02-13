import authAxios from '@/api/index'

export const collegeType = (type) => {
  return authAxios.request({
    url: `/college/type/${type}`,
    method: 'GET'
  })
}

export const collegeParent = (parent) => {
  return authAxios.request({
    url: `/college/parent/${parent}`,
    method: 'GET'
  })
}

export const collegeUpdate = (college) => {
  return authAxios.request({
    url: '/college',
    method: 'PATCH',
    data: college
  })
}

export const collegeCreate = (college) => {
  return authAxios.request({
    url: '/college',
    method: 'POST',
    data: college
  })
}
