var util =require('util');
util.inherits(); //原型继承

util.inspect(); //将任意一个对象转成字符串
console.log(util.inspect(对象,{depth:3})); //将任意一个对象转成字符串
console.log(util.isArray()) ;//判断是不是数组
console.log(util.isRegExp()); //判断是不是正则
console.log(util.isDate()); //是不是日期
console.log(util.isError()); //是不是

console.log(process)  //当前的继承对象
console.log(process.cwd());  //返回进程当前的工作目录。
console.log(process.chdir()) ; //改变进程的当前进程的工作目录，若操作失败则抛出异常。
console.log(process.memoryUsage());  //内存的使用量



