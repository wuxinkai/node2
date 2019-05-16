// cookie 通过检查客户身上的的通行证来确定客户身份，
// session 客户端浏览器再次访问的时候只需要从session中查询该用户的状态就可以了，检查服务器上客户端的明细表
var express = require('express');


var session = require('express-session');
var app = express();

app.use(session({
  secret: 'wuxinkai', //建议使用字符串
  cookie: { maxAge: 60 * 1000 * 30 }, //过期时间（毫秒）
  resave: true,  //每次响应结束都会从新报存session
  saveUninitialized:true //保存未初始化的session
}))

app.get("/", function (req,res) { 
  if (req.session.sign) { //检查用户是否已经登录 
    console.log(req.session); //打印session的值
    res.send('<strong>' + req.session.name + '</strong>')
  } else { 
    req.session.sign = true;
    req.session.name = '努力学习'
    res.send('欢迎登录')
  }
})
app.listen(3000, function () {
  console.log('http://localhost:3000');
});