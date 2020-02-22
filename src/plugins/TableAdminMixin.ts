import { Component, Mixins } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import { resetPassword, userOne } from '@/api/user'
import { gender } from '@/utils/options'
import TableMixin from '@/plugins/TableMixin'

@Component
export default class extends Mixins(TableMixin) {
  $refs : { form: any, view: any, user: any, import: any }
  @State('types', { namespace: 'admin' })protected types!: any
  @Action('getTypes', { namespace: 'admin' }) protected getTypes !: Function
  protected permission = { add: false, import: false }
  protected gender: any = gender
  protected status = [
    { name: '启用', value: true },
    { name: '警用', value: false }
  ]

  protected search: any = {}
  get colleges () {
    if (this.search.schoolId !== '') {
      const college: Array<any> = this.types['1']
      return this._.filter(college, { parentId: this.search.schoolId })
    } else {
      return []
    }
  }
  get departments () {
    if (this.search.collegeId !== '') {
      const department: Array<any> = this.types['2']
      return this._.filter(department, { parentId: this.search.collegeId })
    } else {
      return []
    }
  }
  get specialty () {
    if (this.search.depId !== '') {
      const specialty: Array<any> = this.types['3']
      return this._.filter(specialty, { parentId: this.search.depId })
    } else {
      return []
    }
  }
  get classes () {
    if (this.search.specialtyId !== '') {
      const classes: Array<any> = this.types['4']
      return this._.filter(classes, { parentId: this.search.specialtyId })
    } else {
      return []
    }
  }
  get genderIcon () {
    if (this.search.gender === '') return 'mdi-menu-down'
    return this.search.gender === '男' ? 'mdi-gender-male' : 'mdi-gender-female'
  }

  handleReset () {
    this.search = {
      name: '',
      no: '',
      schoolId: null,
      collegeId: null,
      depId: null,
      enterDate: null,
      specialtyId: null,
      classesId: null,
      gender: null,
      nation: null,
      workDate: null,
      profTitle: null,
      degree: null,
      isEnable: true }
  }

  getNation (id) {
    const nations = this.types['9']
    const find = this._.find(nations, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  getClass (id) {
    const classes = this.types['4']
    const find = this._.find(classes, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  getAcademic (id) {
    const academic = this.types['6']
    const find = this._.find(academic, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  getDep (id) {
    const dep = this.types['2']
    const find = this._.find(dep, { id: id })
    if (typeof (find) === 'undefined') return this.$t('tip.none')
    else return find.name
  }
  handleImport () {
    this.$refs.import.show = true
  }
  handleResetPassword (item) {
    this.$dialog
      .confirm(this.$t('tip.student.resetPassword') as string)
      .then(() => {
        resetPassword({ id: item.id, userId: item.userId }).then(() => {
          this.$toast.success(this.$t('tip.success'))
        })
      })
      .catch(() => {})
  }
  pageRes (res) {
    this.items = []
    res.data.content.forEach(v => {
      v.loading = false
      v.disabled = false
      v.user = false
      this.items.push(v)
    })
    this.itemsLength = res.data.itemsLength
    this.permission.add = res.data.add
    this.permission.import = res.data.import
  }
  handleUser (item) {
    item.user = true
    userOne(item.userId).then(res => {
      this.viewItem = res.data
      this.viewItem.userEdit = item.userEdit
      this.$refs.user.show = true
    }).finally(() => {
      item.user = false
    })
  }
}
