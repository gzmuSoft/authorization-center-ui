/**
 * 获取 url 参数
 *
 * @param name 参数名称
 * @return {string|null}
 */
export const getUrlParams = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export const setTitle = (title) => {
  window.document.title = title
}
