var express = require('express');
var ZhuCeDengLuModel = require('../model');
var router = express.Router();


/*注册 的时候到这来  http://localhost:3000/users/reg  ------------------ ------------------------------*/
router.get('/reg', function (req, res, next) {
  res.render('zhucedenglu/reg', {title:'注册'})

});
// 注册 提交
router.post('/reg', function (req, res, next) {
  //接收提交内容
  var user = req.body

  //插入数据库
  ZhuCeDengLuModel.create({username:user.username,password:user.password,code:user.code},function(err,doc){
    if (err) {
      res.redirect('back')
    } else { 
      //把保存的用户 放到此用户的user属性上
      req.session.user = doc
      req.flash("success","注册成功")
      res.redirect('/users/login')
    }
  })
});





/*登录  http://localhost:3000/users/login  ------------------------ ------------------------ ------------------------*/
router.get('/login', function(req, res, next) {
  res.render('zhucedenglu/login', {title:'登录'})
});
// 登录 提交
router.post('/login', function (req, res, next) {
  
});




//退出 ------------------------ ------------------------ ------------------------ ------------------------ ------------------------
router.get('/logout', function(req, res, next) {
  req.session.user = null; //
  req.flash("success","退出成功")
  res.redirect('/')
});
module.exports = router;
