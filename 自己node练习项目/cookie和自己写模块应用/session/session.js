var express = require('express');
var session = require('express-session');
app = express();
app.use(session({
    secret:'zfpx', //建议使用随机字符串  加密用
    cookie:{maxAge:60*1000*30}, //过期时间
    resave:true,
    saveUninitialized:true
}));
app.get('/',function(req,res){
    if(req.session.sign){ //检测是否登录
        console.log(req.session) //打印值
        res.send(req.session.name)
    } else {
        // 第一次访问的的时候 会生成一个sid 加随机数
        //session.sin ={}
        // 把这个session发送到客户端
        req.session.sign =true; //第一次进来给sign == true 第二次走就就是10行
        req.session.name ='珠峰培训'; //name赋值
        res.send('欢迎登录')

    }
})
app.listen(5050)
