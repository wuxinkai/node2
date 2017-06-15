var fs=require('fs')
//合并路径
var path =require('path');
console.log(path.join('./book','mySqi.json'));

//分隔符
console.log(path.sep)

//处理路径
console.log(path.join('./book','mysql.json ')) //合并路径
console.log(path.sep) //分割路径
console.log(__filename) //获取当前的模块的绝对路径
console.log(__dirname) //获取当前模块所在的绝对目录
console.log(path.basename('node.json','json')) //获取文件名
console.log(path.extname('node.json')) //获取一个路径里文件扩展名
//从一个相对路径解析一个绝对路径， 以应用程序的目录为跟起点
 console.log(path.resolve('book','node.json'))
