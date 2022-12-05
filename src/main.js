const newDiv1 = dom.create(`<div id="red">newDiv1</div>`)
const newDiv2 = dom.create(`<div>newDiv2</div>`)
const newDivParent = dom.create(`<div id="parent">newDivParent</div>`)

// dom.after(test, newDiv)

// dom.before(test, newDiv)

dom.append(test, newDiv1)
dom.append(test, newDiv2)

dom.wrap(newDiv1, newDivParent)

// dom.remove(newDiv)

dom.empty(test)

dom.attr(test, 'title', 'hello, world')
let title = dom.attr(test, 'title')
console.log('attr value:', title)

dom.text(test, '你好,这是新的内容')

let html = dom.html(test)
console.log('html:', html)

dom.style(test, { color: 'red', fontSize: '24px' })
console.log('style value:', dom.style(test, 'color'))
dom.style(test, 'color', 'blue')

dom.class.add(test, 'red')
// dom.class.remove(test, 'red')
console.log('class', dom.class.has(test, 'red'))

const fn = () => {
  console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

dom.append(test, newDiv1)
dom.append(test, newDiv2)
let findDiv = dom.find('#test')[0]
console.log('find', findDiv)
console.log('find with scope:', dom.find('#red', findDiv)[0])

console.log('parent:', dom.parent(test))
console.log('children', dom.children(test))

console.log('all siblings:', dom.siblings(newDiv1))
console.log('next sibling', dom.next(newDiv1))
console.log('previous sibling', dom.previous(newDiv1))

dom.each(dom.children(list), (n) => dom.style(n, 'color', 'blue'))

console.log('index:', dom.index(child3))
