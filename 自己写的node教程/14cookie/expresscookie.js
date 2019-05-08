var express = require('express');
var cookieParse = require('cookie-parser');

var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');
app.set('views',path.resolve()); //模板一个空格都不能有
app.use(cookieParse());

//中间件
    function checklogin(req,res,next){
        if(req.cookies &&req.cookies.username){ //cookie有值  cookies的username也有值
            next();
        }else {
            res.redirect('/'); // 从定向
        }

    }

//登录
app.get('/',function(req,res){
    res.render('login',{});
})
//登录
app.get('/login',function(req,res){
    var username = req.query.username;
<<<<<<< HEAD:自己写的node教程/14cookie/expresscookie.js
    res.cookie('username',username);
=======
    res.cookie('username',username);//将得到内容写入前端
>>>>>>> 63d1547c00d73242cf760712595d81370009e77d:自己写的node教程/cookie/expresscookie.js
    //重定向,让客户端从新请求参数指定的路径
    res.redirect('/user'); //
});
//登录用户主页
<<<<<<< HEAD:自己写的node教程/14cookie/expresscookie.js
app.get('/user',checklogin,function(req,res){ //checklogin可以加参数

    res.send(req.cookies.username);
=======
app.get('/user',checklogin,function(req,res){ //checklogin可以加参数 
    var username = req.query.username;
    console.log(req.cookies.username);
    res.send(req.cookies.username); //获取内容返回给前端
>>>>>>> 63d1547c00d73242cf760712595d81370009e77d:自己写的node教程/cookie/expresscookie.js
})
app.listen(9090);