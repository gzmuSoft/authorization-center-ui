import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component
export default class extends Vue {
  @Prop(Object) protected item !: object
  protected show: boolean = false
  protected res: any = {}
  protected loading = false
  $refs: {
    form: any
  }
  created () {
    this.res = this.item
  }
  @Watch('item')
  keep () {
    this.handleReset()
  }
  handleReset () {
    this.res = this._.cloneDeep(this.item)
    if (typeof (this.$refs.form) === 'undefined') return
    this.$refs.form.resetValidation()
  }
  async handleSave () {
    // need implement
  }
}
