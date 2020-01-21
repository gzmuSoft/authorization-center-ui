import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Dashboard from '@/views/dashboard'

jest.mock('vuex-along', () => () => {})

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Dashboard', () => {
  let actions
  let store: any

  beforeEach(() => {
    actions = {
      changeDrawer: jest.fn(),
      changeTheme: jest.fn()
    }
    store = new Vuex.Store({
      state: {
        theme: true,
        drawer: true
      },
      actions
    })
  })

  it('should change drawer when passed', function () {
  })
})
