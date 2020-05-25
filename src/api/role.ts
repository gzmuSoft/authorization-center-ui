import authAxios from '@/api/index'

/**
 * Get role by parent
 */
export const roleParent = (parentId) => {
  return authAxios.request({
    url: `/role/parent/${parentId}`,
    method: 'GET'
  })
}

/**
 * Get role by parent
 */
export const roleRes = (id) => {
  return authAxios.request({
    url: `/role/res/${id}`,
    method: 'GET'
  })
}

/**
 * update role
 */
export const roleUpdate = (role) => {
  return authAxios.request({
    url: '/role',
    method: 'PATCH',
    data: role
  })
}

/**
 * Add role
 */
export const roleAdd = (role) => {
  return authAxios.request({
    url: '/role',
    method: 'POST',
    data: role
  })
}
