//这是二队列里的 需要比对时间
setTimeout(function(){
    console.log('1')
},0)
//这是二队列里的直接执行
setImmediate(function(){
    console.log('2')
})
//这是一队列的最后执行  把这个函数放在当前任务的末尾执行
process.nextTick(function(){
    console.log('3')
})
//一队列的
console.log('4');