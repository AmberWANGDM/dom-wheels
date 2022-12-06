window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements
  if (typeof selectorOrArrayOrTemplate === 'string') {
    if (selectorOrArrayOrTemplate.trim().indexOf('<') === 0) {
      // 创建div
      elements = [createElement(selectorOrArrayOrTemplate)]
    } else {
      // 查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate)
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate
  }
  function createElement(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  }

  const api = Object.create(jQuery.prototype) //api.__proto__ => $.prototype
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  })
  return api
}

jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index] // this 就是 api
  },
  appendTo(node) {
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el))
    } else if (node.jquery) {
      this.each((el) => node.get(0).appendChild(el))
    }
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      elements[i].classList.add(className)
    }
    return this // 链式
  },
  find(selector) {
    let arr = []
    for (let i = 0; i < this.elements.length; i++) {
      let elements2 = this.elements[i].querySelectorAll(selector)
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
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(undefined, this.elements[i], i)
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
    console.log(this.elements)
  },
}
