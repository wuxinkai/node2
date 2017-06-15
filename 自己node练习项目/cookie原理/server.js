var http = require('http');
var cookieParser = require('cookie-parser') //获取cookie插件
http.createServer(function(req,res){
    if(req.url=='/write'){
        //res.setHeader('Set-Cookie','name=zfpx'); //写入cookie
        //res.end('ok')

        //设置过期时间   5秒过期      在控制台看过期时间 document.cookie
        var time = new Date(new Date().getTime() + 5*1000).toGMTString();
        res.writeHead(200,{
            'Set-Cookie':'name=zfpx; path=/; Expires='+time //time 过期时间
        });
        res.end('ok ')
    }else if(req.url=='/read'){
        console.log(req.headers)
        res.end(req.headers.cookies)
    }
}).listen(8080)