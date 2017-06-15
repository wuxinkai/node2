var http = require('http')
var cookieParser = require('cookie-parser')

http.createServer(function(req,res){
    if(req.url=='/write'){
        ////
        //res.setHeader('Set-Cookie','name=wuxinkai');
        //res.end('ok ')

        //设置过期时间
        var time = new Date(new Date().getTime() + 10*1000).toGMTString();
        res.writeHead(200,{
            'Set-Cookie':'name=zfpx; path=/; Expires='+time //time 过期时间
        });
        res.end('ok ')
    }else if(req.url=='/read'){
        console.log(req.headers)
        res.end(req.headers.cookie)
    }else if(req.url=='/'){
       // 如果 请求中 cookie 存在visited 则输出cookie
       // 否则设置cookie 字段visited 并且输出时间为10分钟
       if(req.cookies.visited){ //有值才走这一行

           res.send("欢迎老朋友");
       }else{
            res.cookie('visited', 1, {maxAge: 10* 60 * 1000});
            res.send("欢迎新朋友");
           res.cookie('visited','wu',{
               domain:'a.zfpx.cn', //只有再次访问这个域名的时候客户端才会向服务器端发送请求
               path:'/read1' //指定路径 只有当下次客户端 向服务器发送请求时 比如 parh='/read1'的时候才会向服务器发送
           });
           //res.redirect('/user'); //重定向 让客户端重新请求参数的指定路径
        }
    }
//app.get('/user',function(req,res){
//    res.send(req.cookies.username)
//})
}).listen(8080)







