import Vue from 'vue'
import axios from 'axios'
import { baseURL } from '@/api/config'
import { AuthModule } from '@/store'
import i18n from '@/locales/i18n'

class HttpRequest {
  private readonly baseUrl: string;
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getGlobalConfig () {
    return {
      baseURL: this.baseUrl,
      headers: {}
    }
  }

  interceptors (instance: any) {
    instance.interceptors.request.use((config: any) => {
      config.headers.Authorization = 'Bearer ' + AuthModule.accessToken
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use((config: any) => {
      return config
    }, (error: any) => {
      let message = i18n.t(`tip.error.${error.response.status}`)
      if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('error')) {
        message = error.response.data.error
      }
      Vue.prototype.$toast.error(message as string)
      return Promise.reject(error.response)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getGlobalConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}

export default HttpRequest
