var express = require('express');
var router = express.Router();

/* 获取 增加文章   http://localhost:3000/articles/add  */
router.get('/add', function(req, res, next) {
  res.send('增加文章');
});
// 提交 增加文章
router.post('/add', function(req, res, next) {
  res.send('增加文章222');
});
module.exports = router;
