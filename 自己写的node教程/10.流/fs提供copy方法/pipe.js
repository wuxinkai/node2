var fs = require('fs')
function copy(src,target){
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(target);
    //对文件操作 写和读的时候
    //要先打开文件 然后读写文件  关闭文件
  // 将数据的 带留量 限制到一个可接受的水平 可以是不同的速度的来源和目标不会淹没 可用内容
    rs.pipe(ws);
   //rs.pipe(ws,{end:false}); //end为true时表示数据读取完毕后立刻将缓存区中的数据写入目标，并关闭文件
}

//pipe方法的源代码
//function pipe(source,dest){
//    //监听data事件
//    source.on('data',function(chunk){
//        //写成功的是true  失败是false
//        if(false==dest.write(chunk)){
//            //停止触发事件
//            source.pause()
//        }
//    });
//    //当全部咽下去之后执行的额事件
//    dest.on('drain',function(){
//        //重新触发data事件
//        source.resume()
//    })
//}

copy('./index.js','./write.txt');