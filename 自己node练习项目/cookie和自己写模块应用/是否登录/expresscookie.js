var express = require('express');
var cookieParse = require('cookie-parser');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');
app.set('views',path.resolve()); //设置当前目录
app.use(cookieParse()); //body-parser依赖中间件

//中间件   保证必须登录后才能访问
    function checklogin(req,res,next){
        if(req.cookies &&req.cookies.username){ //cookie有值  cookies的username也有值
            next();// 有cookie 才放行
        }else {
            res.redirect('/') //
        }

    }

//登录
app.get('/',function(req,res){
    res.render('login',{})  //重定向
})
//登录
app.get('/login',function(req,res){
    var username = req.query.username;
    res.cookie('username',username); //这是cookie
    //重定向,让客户端从新请求参数指定的路径
    res.redirect('/user') //
})
//登录用户主页
app.get('/user',checklogin,function(req,res){ //checklogin可以加参数 
    var username = req.query.username;

    res.send(req.cookies.username);
})
app.listen(6060);