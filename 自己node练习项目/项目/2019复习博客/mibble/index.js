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