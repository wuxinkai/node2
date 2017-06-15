var express = require('express');
var cookieparser = require('cookie-parser'); //读写cookie插件
var app = express();
app.use(cookieparser()); // 通过中间件 多了一个 cookies 属性
app.use(express.static(path.json(__dirname,'public'))); // 静态文件中间件

app.get('/write',function(req,res){

    //设置这个cookie属性 属于哪个域名   不加 a. 就是所有带有子域名的zfpx
    //res.cookie('name','zfpx123',{domin:'a.zfpx.cn'});
    //指定路径cookie归随所有
    //res.cookie('name','zfpx123',{path:'/read1'});
    //有效期  在有效期内可以读取
    //res.cookie('name','zfpx123',{maxAge:10*1000}); //倒计时改本地时间也没有用 绝对时间
    //res.cookie('name','zfpx123',{expires:new Date(Date.now()+10*1000)}); //获取本地能改
    //res.cookie('name','zfpx123',{httpOnly:true}); //(JS脚本)将无法读取到COOKIE信息，防止XSS攻击产生

    //第一次进来没有内容
    if(req.cookies.zidingyi){
        res.send("欢迎老朋友朋友")
    }else {
        res.cookie('zidingyi','1',{maxAge:10*1000}); //过去时间十分钟
        res.send("欢迎新新新新新朋友朋友")
    }


//3 指定域名 需要在计算机的path中配置
    res.cookie('name','1',{
        domain:'.zfpx.com' //后缀是zfpx.com的都可以匹配
    });
//4 指定路径
    res.cookie('name','1',{
        //domain:'.zfpx.com', 也可写在一起用 都满足才写入
        path:'/read1' //只有这个路径访问才会有cookie
    });
// 5过期时间
    res.cookie('name','1',{
      expires:new Date(Date.now()+10*1000), //当前时间在 10*1000 十秒
        maxAge:10*1000 //指定有效时间 倒计时
    });
});
app.get('/read1',function(req,res){
    res.send("/read1")
});
app.get('/read2',function(req,res){
    res.send('/read2')
});

app.listen(9091);