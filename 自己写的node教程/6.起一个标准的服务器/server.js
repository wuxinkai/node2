var http =require('http');
var fs =require('fs');
var url = require('url');
var server = http.createServer(function(request,response){
    var now = new Date();
    //（1）响应  内容类型 设置响应头
    response.setHeader('C ontent-Type','text/html;charset=utf8');
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
server.listen(12345,'localhost');