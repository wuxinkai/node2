var express = require('express');

var path = require('path');

var app = express();

var cookieParse = require('cookie-parser');
app.use(cookieParse());

app.get('/',function(req,res){
    if (req.cookies.visited){    //cookies是插件属性
        res.send("欢迎老朋友");
    }else {
        res.cookie('visited', 1, {maxAge: 10* 60 * 1000});
        res.send("欢迎新朋友");
    }
});
//document.cookie = 'wuxinkai=3' 浏览器写入cookie
//设置读取cookie的条件
app.get('/a',function(req,res){
    res.setHeader('Content-Type','text/html;charset=utf-8');
    //普通发送cookie
    //res.cookie('name','1111');
    //指定域名才会发cookie、
    res.cookie('name','zfpx1',{domain:'http://localhost:9090/a'})
    res.end('写入成功')
})
app.listen(9090);