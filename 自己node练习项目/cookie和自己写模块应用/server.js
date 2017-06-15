var url = require('url');
var http = require('http');

var colors = require('colors');
var settings = require('./config/settings'); //自己的的模块
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    console.log(settings.port)
    var pathname = urlObj.pathname;
    if(pathname=='/write'){
//(1)向头信息里写cookie
        //res.setHeader('Set-Cookie',['name=zfpe','age=18','name1=wyx']);

//(2)设置失效时间        当前时间 + 10秒
        var time = new Date(new Date().getTime() + 60*1000).toGMTString();
        //response.writeHead 写的是响应头
        res.writeHead(200,{
            //           属性名      path 跟目录 过期时间
            'Set-Cookie':'guoqishijian=10s; path=/; Expires='+time
        });

            res.end('ok')
    }if(pathname=='/read'){
        //header的属性全部为小写  读取cookie
        var cookie=req.headers.cookie;
        res.end(cookie)
    }

}).listen(settings.port,function(){
    console.log( ("Listening on port " + settings.port).green );
});
