import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { gender } from '@/utils/options'

@Component
export default class extends Vue {
  @State('types', { namespace: 'admin' })protected types!: any
  protected gender: any = gender
  protected status = [
    { name: '启用', value: true },
    { name: '警用', value: false }
  ]
}
