import axios from 'axios'
import authAxios from '@/api/index'
import { baseURL } from './config'

const OAUTH_SERVER = `${baseURL}/oauth/server`
const OAUTH_TOKEN = `${baseURL}/oauth/token`
const REFRESH_TOKEN = `${baseURL}/oauth/refresh_token`
const OAUTH_LOGOUT = `${baseURL}/oauth/logout`

/**
 * Get oauth server
 */
export const oauthServer = () => {
  return axios({
    url: OAUTH_SERVER,
    method: 'GET'
  })
}

/**
 * Get token info
 * @param code 授权码
 */
export const oauthToken = (code: String) => {
  return axios({
    url: OAUTH_TOKEN,
    method: 'POST',
    data: { code }
  })
}

/**
 * Get login url
 */
export const oauthLogout = () => {
  return axios({
    url: OAUTH_LOGOUT,
    method: 'GET'
  })
}

/**
 * Refresh token
 * @param refreshToken
 */
export const oauthRefresh = (refreshToken: String) => {
  return authAxios.request({
    url: REFRESH_TOKEN,
    method: 'POST',
    data: { refresh_token: refreshToken }
  })
}

/**
 * Current user info.
 */
export const oauthMe = () => {
  return authAxios.request({
    url: '/oauth/me',
    method: 'GET'
  })
}
