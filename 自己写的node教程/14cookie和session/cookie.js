var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get('/write', function (req, res) {
  var time = new Date(new Date().getTime() + 20 * 1000).toGMTString();
  //发送给前端
  res.writeHead(200, {
    //自定义头
    'Set-Cookie': 'name=wuxinkai; path=/; Expires=' + time //time 过期时间
  });
  res.send("设置成功")
});

app.get('/read', function (req, res) {
  console.log(req.headers);
  //获取cookie
  res.end(req.headers.cookie);
});
app.get('/', function (req, res) {
  // 如果 请求中 14cookie 存在visited 则输出cookie
  // 否则设置cookie 字段visited 并且输出时间为10分钟
  if (req.cookies.visited) { //有值才走这一行
    res.send("欢迎老朋友");
  } else {
    res.cookie('visited', 'wu', {
      // domain: 'http://localhost:3000/', //只有再次访问这个域名的时候客户端才会向服务器端发送请求
      // maxAge: 10 * 60 * 1000,
      // path: '/read' //指定路径 只有当下次客户端 向服务器发送请求时 比如 parh='/read1'的时候才会向服务器发送
    });
    res.send("欢迎新朋友");
  }
});

app.listen(3000, function () {
  console.log('http://localhost:3000');
});