var fs = require('fs');
//创建目录
fs.mkdir('text',function(err){  //创建一个叫text的目录
    if(err){
        console.log('创建失败')
    }else{
        console.log('创建成功')
    }
})
//创建目录的时候 父目录必须存在
fs.mkdir('text/t',function(err){  //在text下创建一个叫t的目录
    if(err){
        console.log('创建失败')
    }else{
        console.log('创建成功')
    }
})

//读取目录下的文件
fs.readdir('./text',function(err,files){
    console.log(files) //把files下的文件名做成数组 [ 'box.txt', 'list.json', 't' ]
})


// 获取一个文件或目录详情
fs.readdir('./text',function(err,files){
    files.forEach(function(file){
        fs.stat(file,function(state){
            console.log(state.isDirectory())  //是否是目录
            console.log(state.isFile())  //是否是文件
            console.log(state.size)
        })
    })
})

//判断一个文件或文件夹是否存在
fs.exists('./text',function(exists){
    console.log(exists)
})

//合并链接路径
console.log(path.jion('./text','mysql.json'))

//分隔符
    console.log(path.sep) //  \
    console.log(__filename) //获取当前模块的绝对路径
    console.log(__dirname) //获取  当前模块所在的绝对目录
    console.log(path.basename('path.js','js')) //获取路径；里的文件名
    console.log(path.extname('path.js')) //获取文件的扩展名
    console.log(path.resolve('book','node.json')) // 从一个相对路径解析一个绝对路径



//题目  如果父元素不存在  则需要自动创建
function makep(path,callbck){
    // 把参数转成数组
    // 依次判断目录是否存在 如果存在就跳过去 如果不存在就创建子目录
    // 创建一个最终的目录
}
