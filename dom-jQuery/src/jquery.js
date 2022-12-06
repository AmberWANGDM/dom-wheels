window.$ = window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  return {
    addClass(className) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className)
      }
      return this // 链式
    },
    find(selector) {
      let arr = []
      for (let i = 0; i < elements.length; i++) {
        let elements2 = elements[i].querySelectorAll(selector)
        arr.push(...elements2)
      }
      let newApi = jQuery(arr)
      return newApi
    },
  }
}
