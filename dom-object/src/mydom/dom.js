window.dom = {
  find(selector, scope) {
    const node = (scope || document).querySelectorAll(selector)
    return node
  },
  style(node, name, value) {
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
  each(nodes, fn) {
    for (let i = 0; i < nodes.length; i++) {
      fn.call(undefined, nodes[i])
    }
  },
}
