/*
 jsonp的缺点  必须是get请求 不能传递请求体  不能发送数据  也不安全

 在标准浏览器下使用XMLHttpRequest对象
 浏览器使用跨域资源共享的时候必须在浏览器设置access-Control-Allow-Origin
 req.writeHeader(200,{'access-Control-Allow-Origin':"*"})
 *代表 允许任何服务器访问，也可以改成固定的原
 req.writeHeader(200,{'access-Control-Allow-Origin':"http://localhost:65535"})
*/


var http = require('http');
var fs = require('fs');
//接收html页面发过来的请求

var users =[];
http.createServer(function(req,res){


    var result='';
    req.on('data',function(data){
        result+=data;
        console.log(result)
    })
    req.on('end',function(data){
        //设置响应头 允许那个来源来访问我这个服务器
        res.setHeader('Access-Control-Allow-Origin','http://localhost:63342')
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users))
    })

}).listen(8080);


