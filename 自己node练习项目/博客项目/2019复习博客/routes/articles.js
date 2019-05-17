var express = require('express');
const articlesMongoose = require('../model/articles222')
var router = express.Router();

/* 获取 增加文章   http://localhost:3000/articles/add  */
router.get('/add', function(req, res, next) {
  res.render('articles/addHtml', {title:'增加文字'})
});
// 提交 增加文章
router.post('/add', function (req, res, next) {
  var article = req.body

  //获取作者，登录后可以获取到
  var user = req.session.user;
  article.user = user;

  //插入数据库
  articlesMongoose.create(article, function (err,data) { 
    if (err) {
      req.flash('error', "插入错误")
      res.redirect('back')
    } else { 
      req.flash('success', "发表成功")
      res.redirect('/')
    }
  })
});

//查看详情

router.get('/detail/:_id', function (req, res, next) {
  var ID = req.params._id
  articlesMongoose.findById(ID, function (err,data) { 
    if (err) {
      req.flash('error', "插入错误")
      res.redirect('back')
    } else { 
      req.flash('success', "发表成功")
      res.render('articles/detail', {detailText:data})
    }
  })

});

// 删除 
router.get('/delete/:_id', function (req, res) {
  articlesMongoose.remove({_id:req.params._id}, function (err,data) { 
    if (err) {
      req.flash('error', "删除错误")
      res.redirect('back')
    } else { 
      req.flash('success', "删除成功")
      res.redirect('/')
    }
  })
});

// 修改


module.exports = router;
