// 服务器

var http = require('http');
 http.createServer(function(req,res){
     console.log(req.method); //请求方法 GEt方法
     console.log(req.headers); //请求头
     console.log(req.httpVersion); // http的版本号
     console.log(req.url); // 请求的url

     //响应头有四种    通用头  响应头 实体头  自定义头
     res.setHeader('name','wxk'); //响应头
     res.setHeader('name','wxk'); //自定义头
     res.end('over')
 }).listen(8080)