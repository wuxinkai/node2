var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// var MongoStore = require('connect-mongo/es5')(session)
var logger = require('morgan');

var flash = require('connect-flash')//消息提示 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');

var app = express();


//存储
app.use(session({
  secret: '2019blog', //建议使用字符串
  resave: true, //每次响应结束都会从新报存session
  saveUninitialized: true, //保存未初始化的session
}))

// 消息提示
app.use(flash())

//控制状态写到中间件中
app.use(function (req, res, next) {
  //res.locals 渲染模板的对象
  res.locals.userIf = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//根目录
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;