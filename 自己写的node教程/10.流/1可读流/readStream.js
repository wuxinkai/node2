var fs = require('fs');
//创建可读流
//var rs = fs.createReadStream('./index.txt');
// 截取 流里的内容  原本是到9
var rs = fs.createReadStream('./index.txt',{
    start:3,
    end:8,
    highWaterMark:1 //读取多少字节  分两次传输
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





// fs和流的区别


//  fs 模块读写方法
// 将模块作为整体 读入缓存区     异步 readFile    同步 readFileSync
// 将模块作为整体 写入缓存区     异步 writeFile    同步 writeFileSync

//缓冲区   就是内存里的 一段内容    不会超过总的内存

// 什么是流   流是一组有序的  有终点和起点的字节数据传输手段

/*
他不关心整体内容，只关注是否从文件中都到了数据，以及读到数据之后的处理
流 是一个抽象接口 被node中的很多对象所实现  比如对一个http服务器的请求对象 request是一个流，stdout也是一个留

stream.Readable可读性  使用实现了stream.Readable接口的对象来将对象数据读取为流数据，在你表明你准备好接受之前，Readable流并不会开始发射数据
*/

// 学第一个流  文件流
var fs = require('fs')
//创建一个可读流
fs.createReadStream(path,[options])
//path 是文件路径 ，
//options
//    flags 对文件进行何种操作 默认是r
//    encoding指定编码  默认null
//    autoClose 读完数据后是否关闭文件描述
//    start  用整数表达文件 开始读取字节数 的索引
//    end  用整数表达文件 结束 读取的字节数的索引位置(包含end位置)
//    higWaterMark 最高水平线 停止从底层资源前内部缓冲区最多能存放的字节  缺省为64kb


// pipe 方法
//将数据的带瘤量限制到一个可接收的水平，以使得不同的速度的来源和目标不会淹没可以内存