import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class extends Vue {
  $refs : { form: any, view: any }
  protected items = []
  protected search = {}
  protected init = true
  protected options = {
    sortBy: [ 'sort' ],
    sortDesc: [ false ],
    page: 1
  }
  protected footer = {
    itemsPerPageOptions: [5, 10, 15, 20],
    showCurrentPage: true,
    showFirstLastPage: true
  }
  protected load = false
  protected itemsLength = -1
  protected viewItem: any = {}

  created () {
    this.getPage(this.options)
  }

  @Watch('options')
  optionsChange (val) {
    this.getPage(Object.assign(this.toPage(val), this.search))
  }

  handleSearch () {
    if (!this.$refs.form.validate()) return
    this.options.page = 1
    this.getPage(Object.assign(this.toPage(this.options), this.search))
  }

  handleView (item) {
    // show view dialog, if not view, should override this method.
    this.$refs.view.show = true
    this.viewItem = item
  }

  handleUpdate (item) {
    this.viewItem = item
    const index = this._.findIndex(this.items, { id: item.id })
    this.items.splice(index, 1, item)
  }

  handleAdd () {
    this.handleView({
      id: null,
      edit: true,
      isEnable: true,
      sort: 1
    })
  }

  handleDelete (item) {
    // need implement
  }

  getPage (option) {
    // need implement
  }

  toPage (val) {
    val.size = val.itemsPerPage
    let sort = ' '
    for (let i in val.sortBy) {
      sort += val.sortBy[i]
      sort += val.sortDesc[i] ? ' desc' : ''
      sort += ','
    }
    val.sort = sort.substring(0, sort.length - 1)
    if (val.sort.length === 0) val.sort = null
    return val
  }
}
