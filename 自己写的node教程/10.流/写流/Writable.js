 //可写流
//write 写入数据
//end  结束数据时候触发。迫使缓存区中的数据写入目标对象，调用后不能再写入

var fs = require('fs');
//var ws = fs.createWriteStream('../box/write.txt',{  父目录必须存在，不存在就会报错
var ws = fs.createWriteStream('./write.txt',{  //没有的话自己会创建
    flags:'a', //表示不清空 原来的文件  向尾部追加
    start:12, //四个汉字 所以是12，开始写入的位置
});
//写入
ws.write("，我",'utf8',function(){
    console.log(arguments)
});
ws.write("是",'utf8',function(){
    console.log(arguments)
});
//写入关闭
ws.end("小狗",'utf8');

// 可配置的参数
/*
flags 对文件采取何种操作 默认 w
encoding 指定编码  默认null
autoClose 是否关闭 文件描述符
start 用整数表示文件的的开始字节数的写入位置
highWaterMark 最高水平线，write()开始返回 false的缓存大小 缺省为16kb
*/