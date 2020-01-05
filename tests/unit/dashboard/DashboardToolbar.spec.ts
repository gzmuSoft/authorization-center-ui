import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import DashboardToolbar from '@/views/dashboard/DashboardToolbar.vue'
const $t = () => {}
const localVue = createLocalVue()
describe('DashboardToolbar', () => {
  let vuetify: any
  const mountFunction = (options: Object = {}) => {
    return mount(DashboardToolbar, {
      localVue,
      vuetify,
      ...options,
      mocks: { $t }
    })
  }

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should emit change drawer when passed', () => {
    const wrapper = mountFunction()
    const buttons = wrapper.findAll('.v-btn')
    expect(buttons.length).toBe(3)
  })
})
