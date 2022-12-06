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
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(undefined, elements[i], i)
      }
      return this
    },
    parent() {
      let arr = []
      this.each((node) => {
        if (arr.indexOf(node.parentNode) === -1) {
          arr.push(node.parentNode)
        }
      })
      return jQuery(arr)
    },
    children() {
      let arr = []
      this.each((node) => {
        arr.push(...node.children)
      })
      return jQuery(arr)
    },
    print() {
      console.log(elements)
    },
  }
}
