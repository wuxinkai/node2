# 博客项目

## 前台 views\zhucedenglu\reg.hbs

- method="post" 提交方式
- action="users/reg" 提交路径
- name="password" 通过 name 传递数据 必须每个 input 都需要 name

```
<div class="form-grid" >
  <form class="form-signin f1" method="post" action="/users/reg">
  <h1 class="h3 mb-3 font-weight-normal">注册页面</h1>
  <label for="text" class="sr-only">注册页面</label>
  <input type="text" id="text" class="form-control" placeholder="注册账号" name="username">

  <label for="inputPassword" class="sr-only">密码</label>
  <input type="password" id="inputPassword" class="form-control" placeholder="注册密码" name="password">

  <label for="code" class="sr-only">验证码</label>
  <input type="text" id="code" class="form-control" placeholder="验证码" name="code">

  <button class="btn btn-lg btn-primary btn-block" type="submit">提交注册</button>
</form>
```

## 后台接收参数 \routes\users.js

- 接收参数和传输数据库
- 数据库引入内容

```
var ZhuCeDengLuModel = require('../model');

router.post('/reg', function (req, res, next) {
  //接收提交内容
  var user = req.body

  //插入数据库
  ZhuCeDengLuModel.create({username:'1',password:'1',code:'1'},function(err,doc){
    if (err) {
      res.redirect('back')
    } else {
      res.redirect('/users/login')
    }
  })
});

```

## 数据库 设置

```
const mongoose = require('mongoose')//第三方模块

 mongoose.connect("mongodb://127.0.0.1/sjkName", {useNewUrlParser:true});  //sjkName 数据库的名字

//数据库连接状态
var db = mongoose.connection
db.on('error', console.error.bind(console, '数据库连接失败：'))

db.once('open', () => console.log('数据库连接成功'))

//定义一个schema 描述集合里有哪些字段 字段是什么类型的
var personSchema = new mongoose.Schema({
    username:String,
    password: String,
    code:String
});

//模型  相当以所有人
var ZhuCeDengLuModel = mongoose.model("ZhuCeDengLu", personSchema); //ZhuCeDengLu 集合的名字

//放开接口
module.exports = ZhuCeDengLuModel
```

# 显示状态

- 登录成功 要显示 退出 查看文章
- 不登录 要显示 登录 无法查看文章
- 页面通讯 express-session

```
cnpm install express-session --save

```

设置储存

```
app.use(session({
  secret: '2019blog', //建议使用字符串
  resave: true,  //每次响应结束都会从新报存session
  saveUninitialized:true //保存未初始化的session
}))
```

设置状态 : 2019 复习博客\routes\users.js

```
 req.session.user = doc
```

全局读取状态

```
app.use(function (req,res,next) {
  //res.locals 渲染模板的对象
  res.locals.userIf = req.session.user;
  next()
})
```

# 退出

```
router.get('/logout', function(req, res, next) {
  req.session.user = null; //
  res.redirect('/')  //重定向
});
```

# 通知 消息 flash

提供给下一个被渲染的额页面

```
cnpm install connect-flash --save
```

在 app 页面添加模块

```
var flash = require('connect-flash')//消息提示
app.use(flash())
```

在 req 上增加了一个方法，设置提示

```
router.get('/logout', function(req, res, next) {
  req.flash("success","退出成功")
  res.redirect('/')
});
```

中间件中 添加全局 app.js

```
app.use(function (req, res, next) {
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
})
```

在页面中 layout.hbs 设置

```
  {{#if error}}
  <div class="alert alert-secondary" role="alert">
    {{error}}
  </div>
  {{/if}}

  {{#if success}}
  <div class="alert alert-primary" role="alert">
    {{success}}
  </div>
  {{/if}}
```
# 权限控制
设置路径 2019复习博客\mibble\index.js
```
//要求路由登录后才能访问
exports.checkLogin = function (req, res, next) { 
  if (req.session.user) {
    next()
  } else { 
    req.flash('error','没有登录')
    res.redirect('/users/login')
  }
}

//要求路由登录后才能访问
exports.checkNotLogin = function (req, res, next) { 
  if (req.session.user) {
    req.flash('error','已经登录')
    res.redirect('/users/login')
  } else { 
    next()
   
  }
}
```
引入应用
```
var validata = require('../mibble')

router.get('/reg',validata.checkNotLogin, function (req, res, next) {
  res.render('zhucedenglu/reg', {title:'注册'})

});

router.get('/logout',validata.checkLogin, function(req, res, next) {
  req.session.user = null; //
  req.flash("success","退出成功")
  res.redirect('/')
});
```
首页显示文字列表
```

```