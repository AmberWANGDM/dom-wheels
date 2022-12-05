window.dom = {
  // 增
  // dom.create(`<div>hi</div>`) 用于创建节点
  create: function (string) {
    const container = document.createElement('template') // td不能放入div, 使用template作为容器
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  // dom.after(node, node2) 用于新增弟弟
  after: function (node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  // dom.before(node, node2) 用于新增哥哥
  before: function (node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  // dom.append(parent, child) 用于新增儿子
  append: function (parent, node) {
    parent.appendChild(node)
    return parent
  },
  // dom.wrap(`<div></div>`) 用于新增爸爸
  wrap: function (node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },

  // 删
  // dom.remove(node) 用于删除节点
  remove: function (node) {
    node.parentNode.removeChild(node)
    return node
  },
  // dom.empty(parent) 用于删除后代
  empty: function (parent) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes
    // 保存删除的节点
    let oldChildren = []
    while (parent.firstChild) {
      let child = dom.remove(parent.firstChild)
      oldChildren.push(child)
    }
    return oldChildren
  },

  // 改
  // dom.attr(node, 'title', ?) 用于读写属性
  attr: function (node, name, value) {
    if (arguments.length === 3) {
      return node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },
  // dom.text(node, ?) 用于读写文本内容
  text: function (node, string) {
    if (arguments.length === 2) {
      // 适配
      if ('innerText' in node) {
        node.innerText = string //ie
      } else {
        node.textContent = string //firefox chrome
      }
    } else if (arguments.length === 1) {
      // 适配
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  // dom.html(node, ?) 用于读写 HTML 内容
  html: function (node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  // dom.style(node, {color: 'red';font-size:24px}) 用于修改 style
  style: function (node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        return node.style[name]
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key]
        }
      }
    }
  },
  class: {
    // dom.class.add(node, 'blue') 用于添加 class
    add: function (node, className) {
      node.classList.add(className)
    },
    // dom.class.remove(node, 'blue') 用于删除 class
    remove: function (node, className) {
      node.classList.remove(className)
    },
    // 查class
    has: function (node, className) {
      return node.classList.contains(className)
    },
  },
  // dom.on(node, 'click', fn) 用于添加事件监听
  on: function (node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  // dom.off(node, 'click', fn) 用于删除事件监听
  off: function (node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },

  // 查
  // dom.find('选择器') 用于获取标签或标签们
  find: function (selector, scope) {
    return (scope || document).querySelectorAll(selector)
  },
  // dom.parent(node) 用于获取父元素
  parent: function (node) {
    return node.parentNode
  },
  // dom.children(node) 用于获取子元素
  children: function (node) {
    return node.children
  },
  // dom.siblings(node) 用于获取兄弟姐妹元素
  siblings: function (node) {
    return Array.from(node.parentNode.children).filter((item) => item !== node)
  },
  // dom.next(node) 用于获取弟弟
  next: function (node) {
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      x = x.nextSibling
    }
    return x
  },
  // dom.previous(node) 用于获取哥哥
  previous: function (node) {
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      x = x.previousSibling
    }
    return x
  },
  // dom.each(nodes, fn) 用于遍历所有节点
  each: function (nodes, fn) {
    for (let i = 0; i < nodes.length; i++) {
      fn.call(null, nodes[i])
    }
  },
  // dom.index(node) 用于获取排行老几
  index: function (node) {
    const list = dom.children(dom.parent(node))
    let i
    for (i in list) {
      if (list[i] === node) {
        break
      }
    }
    return ++i
  },
}
