 //这是服务器

 var http = require('http');
 var users = [];
 /*
 1.客户端把一个用户信息发送给服务器
 2.服务器接收到后追加到users数组中
 3.服务器返回users数组，在客户端哪里显示


 */
 http.createServer(function (req, res) {
   console.log(req.method); //请求方法 GEt方法
   console.log(req.headers); //请求头
   console.log(req.httpVersion); // http的版本号
   console.log(req.url); // 请求的url

   req.setEncoding('utf8'); //设置编码

   //接收客户端的内容
   //没接收到数据都会触发data事件
   var result = '';
   req.on('data', function (data) {
     result += data
   });
   req.on('end', function () {
    //  var user = JSON.parse(result);
     users.push(user);
     //发送到客户端的数据

     //响应头有四种    通用头  响应头 实体头  自定义头  
     res.setHeader('name', 'xiangyingtou'); //响应头
     res.setHeader('zidingyi', 'wxk'); //自定义头
    //  res.end(JSON.stringify(users)) // users是对象 先转成字符串
     res.end() // users是对象 先转成字符串
   })

 }).listen(8080);