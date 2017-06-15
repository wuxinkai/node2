var fs = require('fs');
//1创建目录

//fs.mkdir('text/t1/t2',function(err){  //父目录必须的存在
fs.mkdir('text',function(err){
    if(err){
        console.log('创建失败')
    }else {
        console.log('创建成功')
    }
});

//2读取目录下所有的文件
fs.readdir('./book',function(err,files){
    console.log(files)
})

//3读取一个文件或目录详情
fs.readdir('./book',function(err,files){
    //循环文件列表
   files.forEach(function(file){
       //获取文件详情
       fs.stat('./book/'+file,function(err,state){
            console.log(state.atime) //mtime atime birthtime ctime  都是时间
            console.log(state.size) //2 常用的
            console.log(state.isDirectory()) //2 是不是目录
            console.log(state.isFile()) //2 是不是文件
       })
   })
})

//4判断文件是否存在
fs.exists('./book',function(exists){
    console.log(exists)
})

