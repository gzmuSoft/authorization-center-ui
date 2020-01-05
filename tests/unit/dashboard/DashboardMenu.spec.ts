import { shallowMount } from '@vue/test-utils'
import DashboardMenu from '@/views/dashboard/DashboardMenu.vue'

describe('DashboardMenu', () => {
  it('exist routes props when passed', () => {
    const routesEmpty: Array<Object> = []
    const wrapper = shallowMount(DashboardMenu, {
      propsData: { routes: routesEmpty }
    })
    expect(wrapper.vm.$props.routes).toBe(routesEmpty)
  })
  // ---------------------------------------------------------------
  it('should render menu when routes not empty and passed', function () {
    const routes: Array<Object> = [
      { name: '系统管理', children: [ { text: '仪表盘', icon: 'mdi-view-dashboard', to: { name: 'index' } } ] }
    ]
    const wrapper = shallowMount(DashboardMenu, {
      propsData: { routes }
    })
    const menus = wrapper.find(DashboardMenu)
    expect(menus.exists()).toBeTruthy()
  })
  // ---------------------------------------------------------------
  it('should check snapshot when passed', function () {
    const wrapperEmpty = shallowMount(DashboardMenu)
    expect(wrapperEmpty).toMatchSnapshot()
    const routes: Array<Object> = [
      { name: '系统管理',
        children: [
          { text: '仪表盘', icon: 'mdi-view-dashboard', to: { name: 'index' } },
          { text: '用户管理', icon: 'mdi-view-dashboard', to: { name: 'user' } }
        ]
      }
    ]
    const wrapper = shallowMount(DashboardMenu, { propsData: { routes } })
    expect(wrapper).toMatchSnapshot()
  })
})
