//路由 根据请求路径来处理客户端发起的get请求

//加载
var express = require('express');
//获取配置对象
var app = express();
//配置路由    当用户访问/的时候会执行后面的回调函数
app.get('/', function (req, res) {
  //send他可以自动判断数据类型 ，自动转换详细信息 自动设置Content—Type
  res.send("你好 啊")
});
//中间件， 不写参数匹配的是所以路径，
// app.use("/hello",function(req,res,next)
app.use(function (req, res, next) {
  res.mny = 100;
  next()
})

app.use(function (req, res, next) {
  res.mny = res.mny - 10;
  next() //调用noxt 就会往下执行不调用就不会执行
})
//路由 匹配到第一个后面就不执行了，
app.get('/hello', function (req, res) {
  console.log(req.host); //返回主机名不包括端口号 http://localhost:3000/hello?name=123
  console.log(req.path); //返回url路径名，
  console.log(req.query); //获取客户端的get请求查询字符串转成对象，
  console.log(req.params); //是一个有路径参数组成的对象
  //send他可以自动判断数据类型 ，自动转换详细信息 自动设置Content—Type
  // res.send("get hello 啊")
});



//让某一个中间件最后执行
app.use(function (req, res, next) {
  res.start = Date.now();
  //再存原来的end方法
  var originalEnd = res.end;
  //为res end从新赋值我们自定义的函数
  res.end = function () { //当前的新end 调用老的end、
    //先把原来的end调用一次
    originalEnd.apply(res, Array.prototype.slice.call(arguments))
    console.log(Date.now() - res.start);
  }
  next();
});

//匹配到第一个后面的就不再执行，
var bodyParser = require('body-parser');
//都是把请求体对象加到 req.body上 username=11&password=222->{username:11,password:222}
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.post('/hello', function (req, res) {
  var user = req.body;
  console.log(user);
  res.send("post hello 啊")
});

// 路径参数 把向服务器端传递的参数放在路径里  http://localhost:3000/hello/23/100
app.get('/hello/:id/:age', function (req, res) {
  console.log(req.params.id)
  console.log(req.params.age)
  res.send("post hello 啊")
});
//get  post 还有其他请求都能处理
// app.all('/hello',function(req,res){
//     res.send("all  hello 啊")
// });
//启动服务器
app.listen(3000, function () {
  console.log('http://localhost:3000');
});
//可以匹配所有的请求和响应信息
// app.all();

// get是方法