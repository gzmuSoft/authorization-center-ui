import authAxios from '@/api/index'

export const teacherUpdate = (data) => {
  return authAxios.request({
    url: '/teacher',
    method: 'PATCH',
    data: data
  })
}

export const teacherAdd = (date) => {
  return authAxios.request({
    url: '/teacher',
    method: 'POST',
    data: date
  })
}
