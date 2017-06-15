//路由 根据请求路径来处理客户端发起的get请求

//加载
var express = require('express');
//获取配置对象
var app = express();
//配置路由    当用户访问/的时候会执行后面的回调函数
app.get('/',function(req,res){
    //send他可以自动判断数据类型 ，自动转换详细信息 自动设置Content—Type
    res.send("你好 啊")
});
//中间件
app.use(function(req,res,next){
    res.mny=100;
    next()
})

app.use(function(req,res,next){
    res.mny=res.mny-10;
    next() //调用noxt 就会往下执行不调用就不会执行
})
app.get('/hello',function(req,res){
    //send他可以自动判断数据类型 ，自动转换详细信息 自动设置Content—Type
    res.send("get hello 啊")
});
//让某一个中间件最后执行
app.use(function(req,res,next){
    res.start =Date.now();
    //再存原来的end方法
    var originalEnd = res.end;
    //为res end从新赋值我们自定义的函数
    res.end = function(){ //当前的新end 调用老的end、
        //先把原来的end调用一次
        originalEnd.apply(res,Array.prototype.slice.call(arguments ))
        console.log(Date.now()-res.start);
    }
    next();
});

app.post('/hello',function(req,res){
    res.send("post hello 啊")
});
// 路径参数 把向服务器端传递的参数放在路径里
app.get('/hello/:id/:age',function(req,res){
    console.log(req.params.id)
    console.log(req.params.age)
    res.send("post hello 啊")
});
//get  post 还有其他请求都能处理
app.all('/hello',function(req,res){
    res.send("all  hello 啊")
});
//启动服务器
app.listen(3000);
//可以匹配所有的请求和响应信息
app.all();

// get是方法

// 模板
//1指定渲染模板引起
app.set('view engine','ejs');
//2设置放模板的文件目录
app.set('views',path.join(__dirname,'/'))
//render函数 对网页模板进行渲染  在渲染模板时 locals可为其模板传入变量值 在模板中可调用所传变量
res.render(view,[locals],callback)
//原理就是模板替换

//静态文件服务中间件
//express.static是Express内置的唯一一个中间件 负责管理 Express应用内的静态文件
//如果网页加载静态文件（css js img）就需要另指定一个存放静态文件的目录
//项目目录下添加一个存放静态文件的目录oublic
//在public目录下添加存放 js css img 的目录把相关文件当到相应的目录下
//当浏览器发出文件请求是 服务器就会到这个目录下去寻找相关的文件

//post方法：根据请求的路径发起post请求
//req.body属性解析客户端post请求参数 通过它可以获取请求的参数值
bodyparser =require('body-parset')