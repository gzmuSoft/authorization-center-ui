import Vue from 'vue'
import axios from 'axios'
import { baseURL } from '@/api/config'
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
    instance.interceptors.response.use((res: any) => {
      return res
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
