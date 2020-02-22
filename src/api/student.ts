import authAxios from '@/api/index'

export const studentPatch = (student) => {
  return authAxios.request({
    url: '/student',
    method: 'PATCH',
    data: student
  })
}

export const studentUpdateComplete = (student) => {
  return authAxios.request({
    url: '/student/complete',
    method: 'PATCH',
    data: student
  })
}

export const studentImport = (data) => {
  return authAxios.request({
    url: '/student/import',
    method: 'POST',
    data: data
  })
}

export const studentAdd = (data) => {
  return authAxios.request({
    url: '/student',
    method: 'POST',
    data: data
  })
}
