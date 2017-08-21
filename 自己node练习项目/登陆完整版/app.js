var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser());

app.use(session({
    secret:'zfpx',
    resave:true,
    saveUninitialized:true
}));

//都是把请求体对象加到 req.body上 username=11&password=222->{username:11,password:222}
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','html'); //把模板渲染成html
app.set('views',path.resolve('views'));
app.engine('.html',require('ejs').__express);

var users = [];
//注册
app.get('/signup',function(req,res){
    res.render('signup',{error:req.session.error});
});
// 处理注册表单的post提交
app.post('/signup',function(req,res){
    var user = req.body;

    var oldUser = users.find(function(item){
        return item.username == user.username;
    })
    if(oldUser){
        req.session.error = '此用户名已经被占用，请换个新的试试吧';
        res.redirect('/signup');// 重定向 让客户端重新访问指定路径
    }else{
        users.push(user);
        res.redirect('/signin');
    }
});
app.get('/signin', function (req, res) {
    res.render('signin',{error: req.session.errorMsg2});
});
//登录
app.post('/signin',function(req,res){
    var user = req.body;
    user = users.find(function (item) {
        return item.username == user.username && item.password == user.password;
    });
    if(user){
        req.session.SESSION_USER = user;
        res.redirect('/welcome');
    }else{
        req.session.errorMsg2="用户名或者密   码错误";
        res.redirect('/signin');
    }

});

// 欢迎
app.get('/welcome', function (req, res) {
    res.render('welcome',{user: req.session.SESSION_USER});
});
app.listen(8080);