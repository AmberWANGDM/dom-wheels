window.$ = window.jQuery = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === 'string') {
    elements = document.querySelectorAll(selectorOrArray)
  } else if (selectorOrArray instanceof Array) {
    elements = selectorOrArray
  }
  return {
    oldApi: selectorOrArray.oldApi,
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
      arr.oldApi = this
      let newApi = jQuery(arr)
      return newApi
    },
    end() {
      return this.oldApi
    },
  }
}
