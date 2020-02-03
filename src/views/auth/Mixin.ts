import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {
  protected tipI18n: string = ''
  protected last: String = '.'
  protected show: Boolean = false
  created () {
    this.showLast()
    this.showBack()
  }
  showLast () {
    setInterval(() => {
      this.last += '.'
      if (this.last.length > 3) this.last = ''
    }, 500)
  }
  showBack () {
    setTimeout(() => {
      this.show = true
    }, 6000)
  }
  handleBack () {
    this.$router.push({ name: 'home' })
  }
}
