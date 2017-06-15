var express = require('express');
var app = express()

//接收参数
var bodyParser = require('body-parser'); //接收表单传过来的参数 给post请求
//extended:true 用querystring转化  如果是false会用自己写的一个转化方法
app.use(bodyParser.urlencoded({extended:true})); //这个中间件会把请求提取放在 req.body上
app.use(bodyParser.json());//传过来的是json就是他来处理
app.post('/reg',function(req,res){
    console.log(req.body) //接收到的内容
})
//利用中间件  静态文件中间件
// app.use(express.static(path.resolve('文件夹的名字'))); //指定跟路径
// app.use(express.static(__dirname+'文件夹名字')); //指定跟路径 h和上面一个意思

app.set('view engine','ejs');//设置模板引擎 为ejs的
app.set('views',process.cwd()+'/views');//process.cwd()当前的工作目录

//一旦匹配成功后面的就不在匹配了 直接返回

//中间件    匹配/reg这个路径， 不写表示匹配所有路径
app.use('/reg',function(req,res,next ){
    next() //没有这一行是不往下走的
})
//get 请求   id 传递的参数
app.get('/:id/:age',function(req,res){
    console.log(req.params.id) //获取参数
    console.log(req.params.age) //获取参数
    console.log(req.host); //主机名
    console.log(req.path); //路径名
    console.log(req.query); //查询字符串
    console.log(req.params); //路径参数

    res.render('index',{title:'首页'}); //index文件名 加上后缀也不没错
    res.send('返回前端的内容')
});
app.listen(8080);

/*
 模板
 设置路径
 中间件
 post请求体
*/