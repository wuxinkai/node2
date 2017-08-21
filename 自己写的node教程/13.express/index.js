var express = require('express');
var path = require('path');
var app = express();
/*
 1 动态内容 当前时间
 2 静态内容 teml.html
 3.动静结合
 */
//配置属性
app.set('view engine','ejs');

//app.set('views',process.cwd()+'/views');
//path.resolve 选获取绝对路径  然后拼拼上后的参数
app.set('views',path.resolve('views'));

app.use(express.static(path.resolve('public')));

app.get('/',function(req,res){
    //渲染模板  渲染路径   数据源
    res.render('index',{title:'首页',books:{
        name:'wuxinkai'
    }})
});




app.get('/reg',function(req,res){
    res.render('index',{title:'注册',books:{
        name:'wuxinkai'
    }})
});
app.listen(8080);


