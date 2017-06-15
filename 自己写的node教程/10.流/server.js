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