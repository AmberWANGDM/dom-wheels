const node = $(`<div class="newDiv">新增div<span>子元素</span></div>`)

node.appendTo(document.body) //创建div插入到body中
node.appendTo($('.test')) // 创建div插入到元素里面
$('.chosenDiv').appendTo($('.test')) // 移动元素
