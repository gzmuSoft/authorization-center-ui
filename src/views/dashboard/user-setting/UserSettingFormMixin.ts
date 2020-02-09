import { Component, Vue } from 'vue-property-decorator'
import { meInfo } from '@/api/auth'
import { dataByTypes, dataInfoById } from '@/api/base'
import { gender } from '@/utils/options'
import { toolbars } from '@/utils/config'
import { BaseModule } from '@/store'

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
    let types: Array<Number> = [6, 9]
    if (this.entity.hasOwnProperty('classesId')) {
      dataInfoById(this.entity.classesId).then(res => {
        this.info = res.data.name
      })
      dataByTypes(types).then(res => {
        this.options.academic = res.data['6']
        this.options.nation = res.data['9']
      })
    } else if (this.entity.hasOwnProperty('depId')) {
      dataInfoById(this.entity.depId).then(res => {
        this.info = res.data.name
      })
      types.push(7)
      dataByTypes(types).then(res => {
        this.options.academic = res.data['6']
        this.options.nation = res.data['9']
        this.options.degree = res.data['7']
      })
    }
  }

  get genderIcon () {
    return this.entity.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }

  get change () {
    return !this._.isEqual(this.entity, this.default)
  }

  get locale () {
    return BaseModule.locale === 'zh' ? 'zh-CN' : 'en'
  }

  handleReset () {
    this.entity = this._.cloneDeep(this.default)
  }
}
