import { BaseModule } from '@/store'

export default Vue => {
  Vue.directive('img-view', {
    bind: function (el, binding, vnode, oldVnode) {
      el.addEventListener('click', function () {
        if (el.hasAttribute('src')) {
          BaseModule.CHANGE_IMG(el.getAttribute('src'))
        } else if (vnode.context.hasOwnProperty('image')) {
          BaseModule.CHANGE_IMG(vnode.context.image)
        }
      })
    }
  })
}
