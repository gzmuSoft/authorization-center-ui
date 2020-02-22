import { Component, Mixins } from 'vue-property-decorator'
import FormValidateMixin from '@/plugins/FormValidateMixin'
import DialogViewMixin from '@/plugins/DialogViewMixin'
import { State } from 'vuex-class'
import { gender } from '@/utils/options'
import { userExist } from '@/api/base'

@Component
export default class extends Mixins(FormValidateMixin, DialogViewMixin) {
  private load = { no: false, email: false, phone: false }
  @State('types', { namespace: 'admin' })protected types!: any
  protected gender: any = gender
  $refs: {form: any, no: any, email: any, phone: any}
  get colleges () {
    if (this.res.schoolId !== '') {
      const college: Array<any> = this.types['1']
      return this._.filter(college, { parentId: this.res.schoolId })
    } else {
      return []
    }
  }

  get departments () {
    if (this.res.collegeId !== '') {
      const department: Array<any> = this.types['2']
      return this._.filter(department, { parentId: this.res.collegeId })
    } else {
      return []
    }
  }
  get specialty () {
    if (this.res.depId !== '') {
      const specialty: Array<any> = this.types['3']
      return this._.filter(specialty, { parentId: this.res.depId })
    } else {
      return []
    }
  }
  get classes () {
    if (this.res.specialtyId !== '') {
      const classes: Array<any> = this.types['4']
      return this._.filter(classes, { parentId: this.res.specialtyId })
    } else {
      return []
    }
  }

  async filedExist (field) {
    if (this.res[field] === this.item[field] || this.res[field].length < 1) return false
    this.load[field] = true
    try {
      const res: any = await userExist({ [field]: this.res[field] })
      if (res.data.exist) {
        this.$refs[field].errorBucket = [this.$t('tip.validate.exist', [this.res[field]])]
        return true
      }
      return false
    } finally {
      this.load[field] = false
    }
  }

  async handleSave () {
    if (!this.$refs.form.validate()) return
    this.loading = true
    try {
      await this.handleAction()
      this.$toast.success(this.$t('tip.success'))
      this.show = false
    } finally {
      this.loading = false
    }
  }

  async handleAction () { }
}
