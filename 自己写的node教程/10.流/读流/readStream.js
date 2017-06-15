var fs = require('fs');
//创建可读流
//var rs = fs.createReadStream('./index.txt');
// 截取 流里的内容  原本是到9
var rs = fs.createReadStream('./index.txt',{
    start:3,
    end:8,
    highWaterMark:2 //读取多少字节  分两次传输
});
//转译编码
    rs.setEncoding('utf8')  //把buffer转化为字符串

//得到数据就会触发on事件
rs.on('data',function(data){
    //监听data事件  data不管是否堵住只要触发就会一直吃东西，所有我们需要 停止喂吃的，和继续喂吃的
    //pause 停止喂
    //resume 继续喂
    rs.pause(); //吃一口后停止
    setTimeout(function(){  //主要是控制生产数量和消费数量
        console.log(data)
        rs.resume()
    },1000)

    //console.log("得到的数据",data)
    //console.log("得到的数据",data.toString())
})
//数据得到完成
rs.on('end',function(){
    console.log('end')
});

//同步方法 try catch
//异步 判断回调函数里的error对象是否有值。
//在流里判断错误 监听 error事件
rs.on('error',function(err){
    console.error(err)
});

//可读流有三个事件 data  end error

//可读流的方法
//rs.setEncoding('utf8') 指定编码
//pause  通知对象停止 触发data事件
//resume 通知对象恢复 触发data事件
//pipe   设置管道  将可读流里的内容导入到参数指定的可写流里