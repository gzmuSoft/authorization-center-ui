import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import XLSX from 'xlsx'
const namespace = 'admin'

@Component
export default class extends Vue {
  @Prop(Object) protected config !: any
  @Getter('school', { namespace }) protected school!: Array<any>
  @Getter('college', { namespace }) protected college!: Array<any>
  @Getter('dep', { namespace }) protected dep!: Array<any>
  @Getter('specialty', { namespace }) protected specialty!: Array<any>
  @Getter('classes', { namespace }) protected classes!: Array<any>
  @Getter('academic', { namespace }) protected academic!: Array<any>
  @Getter('nation', { namespace }) protected nation!: Array<any>
  protected data = []
  protected selected = []
  protected footer = {
    itemsPerPageOptions: [5, 10, 15, 20],
    showCurrentPage: true,
    showFirstLastPage: true
  }
  get headers () {
    return []
  }
  handleDeleteSelected () {
    for (let s of this.selected) {
      this.data.splice(this.data.indexOf(s), 1)
    }
  }

  parseData (file) {
    const reader = new FileReader()
    reader.onload = (e: any) => {
      const wb = XLSX.read(e.target.result, { type: 'array', cellDates: true, cellNF: false, cellText: false })
      wb.SheetNames.forEach((sheetName) => {
        const result: any = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: 'A', defval: null, raw: false, dateNF: 'YYYY-MM-DD' })
        for (let r of result) {
          if (r.__rowNum__ < (this.config.start - 1)) continue
          const tmp: any = {}
          for (const key in this.config) {
            tmp[key] = r[this.config[key]]
          }
          this.data.push(this.handleData(tmp))
        }
      })
    }
    return new Promise((resolve, reject) => {
      try {
        reader.readAsArrayBuffer(file)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  protected handleData (tmp: any) { return tmp }
}
