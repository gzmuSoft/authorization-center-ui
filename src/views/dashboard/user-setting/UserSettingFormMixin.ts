import { Component, Vue } from 'vue-property-decorator'
import { meInfo } from '@/api/auth'
import { dataByType, dataInfoById } from '@/api/base'
import { gender } from '@/utils/options'
import { toolbars } from '@/utils/config'

@Component
export default class extends Vue {
  protected default: object = {}
  protected entity: any = {}
  protected options: any = {}
  protected info: string = ''
  protected toolbars: object = toolbars

  async created () {
    toolbars.save = false
    toolbars.imagelink = false
    const info: any = await meInfo()
    this.default = info.data
    this.entity = this._.cloneDeep(info.data)
    this.options.gender = gender
    dataByType(6).then(res => {
      this.options.academic = res.data
    })
    if (this.entity.hasOwnProperty('classesId')) {
      dataInfoById(this.entity.classesId).then(res => {
        this.info = res.data.name
      })
    } else if (this.entity.hasOwnProperty('depId')) {
      dataInfoById(this.entity.depId).then(res => {
        this.info = res.data.name
      })
    }
  }

  get genderIcon () {
    return this.entity.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }
}
