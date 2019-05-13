var express = require('express');
var path = require('path');
var app = express();
/*
 1 动态内容 当前时间
 2 静态内容 teml.html
 3.动静结合
 */
// 1指定渲染模板引起
app.set('view engine','ejs');

//app.set('views',process.cwd()+'/views');
//2设置放模板的文件目录 path.resolve 选获取绝对路径  然后拼拼上后的参数
app.set('views', path.resolve('views'));
// app.set('views',path.join(__dirname,'/'))
//静态文件中间件，设置css样式，
app.use(express.static(path.resolve('public')));

//render函数 对网页模板进行渲染  在渲染模板时 locals可为其模板传入变量值 在模板中可调用所传变量
app.get('/', function (req, res) {
    //渲染模板  渲染路径   数据源
    res.render('index',{title:'首页',books:{
        name:'wuxinkai'
    }})
});




app.get('/reg', function (req, res) {
  
    res.render('index',{title:'注册',books:{
        name:'wuxinkai'
    }})
});
app.listen(8080);


//静态文件服务中间件
//express.static是Express内置的唯一一个中间件 负责管理 Express应用内的静态文件
//如果网页加载静态文件（css js img）就需要另指定一个存放静态文件的目录
//项目目录下添加一个存放静态文件的目录oublic
//在public目录下添加存放 js css img 的目录把相关文件当到相应的目录下
//当浏览器发出文件请求是 服务器就会到这个目录下去寻找相关的文件

//post方法：根据请求的路径发起post请求
//req.body属性解析客户端post请求参数 通过它可以获取请求的参数值
// bodyparser =require('body-parset')


