import { Component, Vue } from 'vue-property-decorator'
import { userExist } from '@/api/user'

@Component
export default class extends Vue {
  $refs: { form: any, import: any, preview: any }
  protected show = false
  async handleSecond (files) {
    this.$refs.preview.data = []
    for (let file of files) {
      await this.$refs.preview.parseData(file)
    }
  }

  async handleValidate (tip, update) {
    if (this.$refs.preview.data.length === 0) {
      this.$toast.error(this.$t('tip.import.noData'))
      return null
    }
    const data = this.$refs.preview.data
    const phone = data.map(d => d.phone)
    const res = await userExist(phone)
    // Already exist users
    const users = res.data
    if (users.length !== 0 && !tip) {
      const names = users.map(u => u.name)
      this.$refs.import.tip.show = true
      this.$refs.import.tip.phone = names
      return null
    }
    return { content: data, config: { update: update } }
  }
}
