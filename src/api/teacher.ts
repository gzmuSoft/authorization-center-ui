import authAxios from '@/api/index'

export const teacherUpdate = (data) => {
  authAxios.request({
    url: '/teacher',
    method: 'PATCH',
    data: data
  })
}
