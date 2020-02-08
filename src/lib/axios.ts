import Vue from 'vue'
import axios from 'axios'
import { baseURL } from '@/utils/config'
import { AuthModule } from '@/store'
import i18n from '@/locales/i18n'
import { oauthServer } from '@/api/oauth'

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
      if (error.response.status === 401) {
        oauthServer().then(res => { window.location = res.data.server })
          .catch(() => { Vue.prototype.$toast.error(i18n.t('tip.error.action') as string) })
      } else if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('error')) {
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
