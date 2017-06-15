console.error('error');//输出错误
console.warn('warn');//输出警告
console.log('log'); //输出日志
console.info('info'); //输出信息
console.time('start1');//时间，计算代码执行的时间

2.__filename,__dirname; //并且不是global上的属性
console.log(__filename); //当前文件的绝对路径
console.log(__dirname); //当前文件所在的文件夹的绝对路径  __dirname的值不会更改

3.setTimeout 定时器,this不是global
function sum(a,b) {
    console.log(a+b);
}
setTimeout(sum,1000,1,2); //可以将参数从第三位开始传入


4.setImmediate 立即 和setTimeout一样是一个异步方法
setImmediate(function () {
    console.log('马上执行写时间也没用');
});
5.process 进程

console.log(__dirname); //传入的形参
console.log(process.cwd());//current working directory;
process.chdir('..');//change directory; __dirname的值不会更改
process.kill() kill杀死进程
process.pid  //pid进程的id号
process.nextTick();//是第一次结束还没到第二次要做的事
setImmediate和setTimeout 是第二次要做的事
