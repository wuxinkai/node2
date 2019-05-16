var express = require('express');
var router = express.Router();

/* 首页  http://localhost:3000/  */
router.get('/', function (req, res, next) {
  res.render('main/index', { title: '传递前端在前端显示内容', author: [{id:1,age:23,name:'xxxx'},{id:1,age:23,name:'xxxx'},{id:1,age:23,name:'xxxx'},{id:1,age:23,name:'xxxx'}]});
});

module.exports = router;
