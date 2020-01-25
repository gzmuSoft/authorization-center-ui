import axios from 'axios'
import { baseURL } from './config'

const OAUTH_SERVER = `${baseURL}/oauth/server`
const OAUTH_TOKEN = `${baseURL}/oauth/token`
const REFRESH_TOKEN = `${baseURL}/oauth/refresh_token`
const OAUTH_LOGOUT = `${baseURL}/oauth/logout`

export const oauthServer = () => {
  axios({
    url: OAUTH_SERVER,
    method: 'GET'
  }).then(res => {
    console.log(res)
  }).catch(error => {
    console.error(error)
  })
}
