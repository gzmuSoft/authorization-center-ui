import authAxios from '@/api/index'

export const studentPatch = (student) => {
  return authAxios.request({
    url: '/student',
    method: 'PATCH',
    data: student
  })
}
