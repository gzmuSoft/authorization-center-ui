import { Component, Vue } from 'vue-property-decorator'
import { meInfo } from '@/api/auth'
import { dataByTypes, dataInfoById } from '@/api/base'
import { gender } from '@/utils/options'
import { toolbars } from '@/utils/config'
import { updateEntity } from '@/api/setting'
import { Getter } from 'vuex-class'

@Component
export default class extends Vue {
  protected default: object = {}
  protected entity: any = {}
  protected gender: any = []
  protected nation: any = []
  protected academic: any = []
  protected degree: any = []
  protected info: string = ''
  protected toolbars: object = toolbars
  protected loading: Boolean = false
  @Getter('localeMarkdown', { namespace: 'base' }) public locale!: string
  $refs: {
    form: any
  }
  async created () {
    toolbars.save = false
    toolbars.imagelink = false
    const info: any = await meInfo()
    this.default = info.data
    this.entity = this._.cloneDeep(info.data)
    this.gender = gender
    let types: Array<Number> = [6, 9]
    if (this.entity.hasOwnProperty('classesId')) {
      dataInfoById(this.entity.classesId).then(res => {
        this.info = res.data.name
      })
      dataByTypes(types).then(res => {
        this.academic = res.data['6']
        this.nation = res.data['9']
      }).finally(() => this.$refs.form.resetValidation())
    } else if (this.entity.hasOwnProperty('depId')) {
      dataInfoById(this.entity.depId).then(res => {
        this.info = res.data.name
      })
      types.push(7)
      dataByTypes(types).then(res => {
        this.nation = res.data['9']
        this.academic = res.data['6']
        this.degree = res.data['7']
      }).finally(() => this.$refs.form.resetValidation())
    }
  }

  get genderIcon () {
    return this.entity.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }

  get change () {
    return !this._.isEqual(this.entity, this.default)
  }

  handleReset () {
    this.entity = this._.cloneDeep(this.default)
  }

  handleSave () {
    if (!this.$refs.form.validate()) {
      this.$toast.warning(this.$t('tip.validate.complete'))
      return
    }
    if (this.entity.hasOwnProperty('resume') && this.entity.resume.length > 4000) {
      this.$toast.warning(this.$t('tip.validate.resume', [this.entity.resume.length]))
      return
    }
    this.loading = true
    updateEntity(this.entity).then(() => {
      this.$toast.success(this.$t('tip.success'))
      this.default = this._.cloneDeep(this.entity)
    }).finally(() => { this.loading = false })
  }
}
