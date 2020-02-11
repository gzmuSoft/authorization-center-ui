import store from '@/store'

export default Vue => {
  Vue.directive('img-view', {
    bind: function (el, binding, vnode, oldVnode) {
      el.addEventListener('click', function () {
        if (el.hasAttribute('src')) {
          store.dispatch('base/changImg', el.getAttribute('src'))
        } else if (vnode.context.hasOwnProperty('image')) {
          store.dispatch('base/changImg', vnode.context.image)
        }
      })
    }
  })
}
