import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class extends Vue {
  $refs: {
    form: any
  }
  protected items = []
  protected search = {}
  protected options = {
    sortBy: [ 'sort' ],
    sortDesc: [ false ]
  }
  protected footer = {
    itemsPerPageOptions: [5, 10, 15, 20],
    showCurrentPage: true,
    showFirstLastPage: true
  }
  protected load = false
  protected itemsLength = -1

  @Watch('options')
  optionsChange (val) {
    this.getPage(Object.assign(this.toPage(val), this.search))
  }

  handleSearch () {
    if (!this.$refs.form.validate()) return
    this.getPage(Object.assign(this.toPage(this.options), this.search))
  }

  getPage (option) {
    console.log(option)
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
