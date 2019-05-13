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

### 1 创建目录

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

### 2 读取目录下所有的文件

```
fs.readdir('./book',function(err,files){
    console.log(files)
})
```

### 3 读取一个文件或目录详情

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

### 4 判断文件是否存在

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

# 写一个 http 服务

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

# ajax 发送步骤

- 0 未初始化 对象建立 尚未初始化 尚未调用 open 方法
- 1 初始化 对象建立 尚未调用 send 方法
- 2 发送数据 send 调用 但是当前的状态 http 头未知
- 3 数据传送中 已接收部分数据
- 4 xhr.readyState = 4 完成 数据接收完成 responseBody 和 responseText 获取完整的应用数据

```
  //（1）创建ajax对象
  var xhr = new XMLHttpRequest();

  //（2）指定参数， 发送地址/clock
  xhr.open('POST', '/clock', true);

  //（4）注册状态后回调函数
  xhr.onreadystatechange = function () {
    //当前状态和响应完毕
    if (xhr.readyState = 4 && xhr.status == 200) {
      document.querySelector('#box').innerHTML = xhr.responseText
    } else {
      document.querySelector('#box').innerHTML = xhr.statusText
    }
  }

  //（3）发送数据，
  xhr.send(JSON.stringify(user))
```

## 接收服务器响应 三部

- xhr.status 成功 200
- statusText 表示 http 的响应状态码描述符
- responseText 表示响应体

# 后台接收 前端发过来的数据

- on 接收 data 和 end
- 对象和字符串的转化 data.toString(); 和 JSON.parse(str)
- SON 通常用于与服务端交换数据。在向服务器发送数据时一般是字符串

```
else if(url=='/clock'){
  //返回给前台一个时间
  var str = '';
  request.on('data', function (data) {
    //转为字符串
    str += data.toString();
  })
  request.on('end', function () {
    console.log(str);
    //转成对象
    users.push( JSON.parse(str))
      response.end(JSON.stringify(users))
    })
  }
```

# 读取 get 请求的本地内容

```
 window.onload=function(){
    document.querySelector('#regBtn').addEventListener('click',function(){
      var xhr = new XMLHttpRequest();
      //发出请求
      xhr.open("GET",'./book.json',true) ; //请求方式  路径    是否异步
      //发送的是表单格式
      // xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
      xhr.setRequestHeader('Content-Type','11111')

      // xhr.responseType="text"; //将字符串转为对象

      //注册回调函数
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
          //获取所以的响应头
          console.log(xhr.getAllResponseHeaders())
          //获取指定的响应头
          console.log(xhr.getResponseHeader('Content-Type'))
          //获取 响应体
          console.log(xhr.responseText)
          //获取状态描述
          console.log(xhr.statusText)
          document.getElementById("box").innerHTML = xhr.responseText
        }
      }
      xhr.send()
    })
}

通过http-server 启动服务，打开 http://127.0.0.1:8080 再点击打开
```

# 上传 json 数据

- application/json 发送的是 json 类型,

```
  function toJson(form) {
    var elements = Array.prototype.slice.call(form.elements); //转换成数组
    var data = {};
    elements.forEach(function (element) {
      //先取出元素的类型
      var type = element.type;
      switch (type) {
        case 'submit':
        case 'cancel':
        case 'reset':
          break;
        case 'text': data[element.name] = element.value;
          break;
        case 'password': data[element.name] = element.value;

      }
    });
    return data
  }

  window.onload = function () {
    document.querySelector('#regBtn').addEventListener('click', function () {
      var xhr = new XMLHttpRequest();
      //发出POST请求
      xhr.open("POST", './reg', true); //请求方式  路径    是否异步

      //发送类型
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.responseType = "text"; //将字符串转为对象
      //注册回调函数
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /2\d{2}/.test(xhr.status)) {
          document.getElementById("box").innerHTML =xhr.responseText
          console.log(xhr.responseText)
        }
      };

      var data = toJson(document.querySelector('form'))
      console.log(data);
      xhr.send(JSON.stringify(data)); //发送的请求头内容，
      return false
    })
  }

```

# json 后台接收,

- 表单接收和 json 接收格式

```
 req.on('end', function (data) {
     //取出请求头的内容类型
     var contentType=req.headers['content-type'];
     //(1)application/x-www-form-urlencoded 序列化表单 查询字符串都用这个
     if(contentType=='application/x-www-form-urlencoded'){
         var obj = querystring.parse(result);
         console.log(obj);
         //json字符串
     }else if(contentType=='application/json'){  //(2)json格式
         var obj = JSON.parse(result);
         console.log(obj)
     }

     res.end('ok')
 })
```

# 上传表单格式

```
  function serialize(form){
      var elements=Array.prototype.slice.call(form.elements);  //转换成数组
      var data=[];
      elements.forEach(function(element){
          //先取出元素的类型
          var type = element.type;
          switch (type){
              case 'submit':
              case 'cancel':
              case 'reset':
                  break;
              case 'text':
                  data.push(element.name+'='+element.value )
          }
      });
      return data.join('&')
  }

  window.onload=function(){
    document.querySelector('#regBtn').addEventListener('click',function(){
        var xhr = new XMLHttpRequest();
        //发出请求
        xhr.open("POST",'./reg',true) ; //请求方式  路径    是否异步
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
//
        xhr.responseType="text"; //将字符串转为对象
        //注册回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
                console.log(xhr.responseText)
            }
        }
        //把表单的值转成查询字符串
        var data =serialize(document.querySelector('form'));  //发送的是表单
        //把数据放在请求头里发送给服务器
          console.log(data)
        xhr.send(data)  //发送的是表
    })
}

//接收的是表单格式
  req.on('end', function (data) {
      //取出请求头的内容类型
      var contentType=req.headers['content-type'];
      //(1)application/x-www-form-urlencoded 序列化表单 查询字符串都用这个
      if(contentType=='application/x-www-form-urlencoded'){
          var obj = querystring.parse(result);
          console.log(obj);
          //json字符串
      }
      res.end('ok')
  })

```

# 图片格式

- form 标签改成 enctype="multipart/form-data"
- var formData = new FormData(); //h5 新增上传图片
- 通过 var formidable= require('formidable'); 接收内容 安装 npm i formidable

## 上传图片的 html 代码
* （1）读取图片信息
* （2）把图片返回给浏览器
* （3）浏览器构建一个img元素 追加到body
```
 window.onload=function(){
        //（1）注册监听
        document.querySelector('#regBtn').addEventListener('click',function(){
            var xhr = new XMLHttpRequest();
            //发出请求
            xhr.open("POST",'./reg2',true) ; //请求方式  路径    是否异步
            //(3)设置响应类型
            xhr.responseType="text"; //将字符串转为对象
            //注册回调函数
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&/2\d{2}/.test(xhr.status)){
                  var img = document.createElement('img');
                  img.src = xhr.responseText;
                  document.getElementById("imgGrid").appendChild(img)
                    console.log(xhr.responseText)
                }
            };
            //（4）准备发射服务器的数据
            var formData = new FormData(); //h5新增上传图片
            //对象的表单元素 都是普通元素
            formData.append('username',document.querySelector('input[name=username]').value);
            //对象的表单元素 都是普通元素
            formData.append('password',document.querySelector('input[name=password]').value);
            // 这是文件元素
            var avatar =document.querySelector('input[name=avatar]');
            formData.append('avatar',avatar.files[0]);//files[0] 表示第一个元素，这个是可以多选的
            xhr.send(formData);//发送的请求头内容，
            return false
        })
    }
```

# 上传图片的 后台代码
```
if (pathname == '/reg2') {
    //创建解析器 用来解析请求体  把非file的input放在filede里 把文件类型的元素放在filede里
  var form = new formidable.IncomingForm();
  //  fields普通的input元素， files图片信息
  form.parse(req, function (err, fields, files) {
    fs.readFile(files.avatar.path, 'binary', function (err, data) {
      var filename = './imgs/' + files.avatar.name;
      fs.writeFile(filename, data, 'binary', function (err) {
        res.writeHead(200, {
          'Content-type': 'text/plain'
        })
        res.end(filename)
      })
    })
}
```

# 全局对象

