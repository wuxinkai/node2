# 读写文件

### (1)同步读取 readFileSync 和 同步读取 readFil

```
  fs.readFile('./a.js', 'utf8', function (err, data) {
    console.log(data)
  })

  fs.readFileSync('./a.js', 'utf8', function (err, data) {
    console.log(data)
  })

  // 在 PS E:\A学习盘\node2\自己写的node教程\4.读写文件> node read.js  输出结果
```

### (2)解决异步获取内容的方法

```
let person = {}
function show() {
  if (Object.keys(person).length ==2) {
    console.log(person);
  }
}

fs.readFile('./a.js', 'utf8', function (err,data) {
  person.name = data;
  show()
})

fs.readFile('./b.js', 'utf8', function (err,data) {
  person.age = data;
  show()
})
```

### (3)同步写入 writeFileSync 和 异步写入 writeFile

flag 是表示 w 是清空并写入 a 在原有基础上追加

```
fs.writeFile('写入的路径', '写入的内容','utf8',{flag:w}, function () { })

fs.writeFileSync('写入的路径', '写入的内容','utf8',{flag:a}, function () { })

//追加内容
fs.appendFile('./a.js', '写入的内容','utf8', function () { })
```

### 读出内容写入另一个 js 中

```
var  fs =require('fs');
function cope(src,tarage){
  fs.readFile(src,'utf8',function(err,data){
    fs.writeFile(tarage,data,'utf8',function(){
      console.log('读取成功')
    })
  })
}
cope('./a.js','./b.js')
```

### 读写图片

```
var fs = require('fs');

function copy(src, target) {
    //读文件     如果是图片就不能用utf8' ,用binary  不知道就不用写
    fs.readFile(src, 'binary', function (err, data) {
        fs.writeFile(target, data,'binary', function (err) {
            console.log("把" + src + "复制到" + target)
        })
    })
}
copy("./zt.png", "./zt2.png");


在node执行 \node2\自己写的node教程\4.读写文件> node img.js
```

# 读写目录

### 1创建目录

```
fs.mkdir('text2',function(err){
    if(err){
        console.log('创建失败')
    }else {
        console.log('创建成功')
    }
});

执行 A学习盘\node2\自己写的node教程\5.读写目录> node 目录.js
```

### 2读取目录下所有的文件

```
fs.readdir('./book',function(err,files){
    console.log(files)
})
```

### 3读取一个文件或目录详情

```
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
```

### 4判断文件是否存在
```
fs.exists('./book',function(exists){
    console.log(exists)
})
```

### 路径拼接
```
//处理路径
console.log(path.join('./book','mysql.json ')) //合并路径

console.log(path.sep) //分割路径

console.log(__filename) //获取当前的模块的绝对路径

console.log(__dirname) //获取当前模块所在的绝对目录

console.log(path.basename('node.json','json')) //获取文件名

console.log(path.extname('node.json')) //获取一个路径里文件扩展名

//从一个相对路径解析一个绝对路径， 以应用程序的目录为跟起点
 console.log(path.resolve('book','node.json'))
```

# 写一个http服务
```
var http =require('http');
var fs =require('fs');
var url = require('url');
//request 客户端的请求
// response 发送给客户端的内容
var server = http.createServer(function(request,response){
  var now = new Date();
  //（1）响应  内容类型 设置响应头
  response.setHeader('Content-Type','text/html;charset=utf8');
  //响应状态码
  response.statusCode=404;
  // 设置响应体
  response.write('hello')
  //结束响应返回给前端的东西都在end里
  response.end(now.toString())

  //（2）请求
  console.log(request.method); //请求的方法
  console.log(request.url); //请求的url
  console.log(request.headers); //请求头
})
server.listen(8080,'localhost');

启动项目 ：自己写的node教程\6.起一个标准的服务器> node server.js
```
![my-logo.png](./images/2.png "my-logo")

