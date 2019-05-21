var express = require('express');
var router = express.Router();

const articlesMongoose = require('../model/articles222') //查询数据绑定到前端

/* 首页  http://localhost:3000/  */
router.get('/', function (req, res, next) {


  // articlesMongoose.find({}, null, {
  //   limit: 3,
  //   skip: 0,
  // }, function (err, article) { //{_id:0 代表不获取_id,id不指定就返回，1代表获取内容
  //   if (err) {
  //     req.flash('error', '查询错误');
  //     res.redirect('/')
  //   }
  //   res.render('main/index', {
  //     articles: article
  //   })
  // })

  //先配置参  在查询 .populate('user')
  articlesMongoose.find().populate('user').exec(function (err, article) {
    if (err) {
      req.flash('error', '查询错误');
      res.redirect('/')
    } else {
      //设置时间格式化
      res.render('main/index', {
        articles: article
      })
    }
  })
});

module.exports = router;