import { Component, Vue } from 'vue-property-decorator'
import SockJS from 'sockjs-client'
import { baseURL } from '@/utils/config'

@Component
export default class extends Vue {
  protected socket: any
  created () {
    this.initWebSocket()
  }
  initWebSocket () {
  }
  connection () {
    this.socket = new SockJS(baseURL)
  }
}
