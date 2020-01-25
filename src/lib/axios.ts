import Vue from 'vue'
import axios from 'axios'
import { baseURL } from '@/api/config'

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
      let message = '未知错误'
      switch (error.response.status) {
        case 400:
          message = '请求错误:访问由于请求体无效被拒绝'
          break
        case 401:
          message = '未经授权:访问由于凭据无效被拒绝'
          break
        case 403:
          message = '鉴权失败:您没有权限访问该资源'
          break
        case 404:
          message = '资源未找到:找不到您访问的资源信息'
          break
        case 500:
          message = '服务错误:服务器出现内部错误，请联系管理员'
          break
      }
      if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('error')) {
        message = error.response.data.error
      }
      Vue.prototype.$toast.error(message)
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
