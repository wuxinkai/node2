//这是二队列里的 需要比对时间 在下个事件环中执行，
//下一个执行完毕后执行这个（排在第一个队列中（这次要办的事），这属于不着急做的）
setTimeout(function(){
    console.log("1")
},0);



//这是二队列里的直接执行
//  处理比较耗时的工作，等其他解决在来解决这个（排再下一次队列中（以后要做的），这是更不着急做的，）
setImmediate(function(){
    console.log("2")
});

//一队列的最后一个， 把这个函数放在当前的任务末尾  （第一个执行，这个属于正常执行）
process.nextTick(function(){
    console.log("3")
})
//一队列的
console.log("4")

//所有同步方法执行完就执行同步