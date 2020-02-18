import authAxios from '@/api/index'

/**
 * Get sys data by type.
 * @param type
 * 0 - school
 * 1 - college
 * 2 - department
 * 3 - speciality
 * 4 - class
 * 6 - academic
 * 7 - degree
 * 9 - nation
 * 11 - professional title
 */
export const dataByType = (type) => {
  return authAxios.request({
    url: `/base/sysData/type/${type}`,
    method: 'GET'
  })
}

/**
 */
export const dataByTypes = (types: Array<Number>) => {
  return authAxios.request({
    url: `/base/sysData/types`,
    method: 'GET',
    params: { types: types.join(',') }
  })
}

/**
 * Get name by Id.
 * @param id id
 */
export const dataInfoById = (id) => {
  return authAxios.request({
    url: `/base/sysData/info/${id}`,
    method: 'GET'
  })
}

/**
 * user exist
 * @param name
 * @param email
 * @param phone
 */
export const userExist = ({ name = '', email = '', phone = '' }) => {
  return authAxios.request({
    url: `/base/user/exist`,
    method: 'GET',
    params: { name, email, phone }
  })
}
