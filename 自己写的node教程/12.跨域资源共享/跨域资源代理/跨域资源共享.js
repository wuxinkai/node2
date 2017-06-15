
var http = require('http');
var fs = require('fs');
//我们自己写的模块
var parseBody = require('./parseBody');  //文件模块 以文件名的方式去找文件
//接收html页面发过来的请求

http.createServer(function(req,res){
    if(req.url=='/'){
        fs.createReadStream('./index.html').pipe(res) //pipe中导流
    }else if(req.url=='/reg'){
        //获取请求体
        parseBody(req,function(result){ //解析完成后的回调

        })
        //构建一个指定8080的请求 请求体传递过去
        //得到8080的响应，然后在转回客户端
    }
}).listen(8080);

//封装常用方法


