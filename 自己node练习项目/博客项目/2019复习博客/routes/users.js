var express = require('express');
var fs = require('fs');
var ZhuCeDengLuModel = require('../model');
var validata = require('../mibble')
var router = express.Router();

var formidable = require('formidable'); //格式化传入内容的


/*注册 的时候到这来  http://localhost:3000/users/reg  ------------------ ------------------------------*/
router.get('/reg', validata.checkNotLogin, function(req, res, next) {
    res.render('zhucedenglu/reg', {
        title: '注册'
    })

});
// 注册 提交
router.post('/reg', validata.checkNotLogin, function(req, res, next) {
    //接收提交内容
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        //（1）读取图片信息
        fs.readFile(files.avatar.path, 'binary', function(err, data) {
            var filename = './自己node练习项目/博客项目/2019复习博客/public/images/' + files.avatar.name;
            if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(filename.slice(-4))) {
                console.log("图片类型必须是.gif,jpeg,jpg,png中的一种");
                req.flash("error", "格式不正确")
                res.redirect('back')
            } else {
                fields.avatar = './images/' + files.avatar.name; //插入内容
                ZhuCeDengLuModel.create(fields, function(err, doc) {
                        if (err) {
                            res.redirect('back')
                        } else {
                            //把保存的用户 放到此用户的user属性上
                            req.session.user = doc
                            req.flash("success", "注册成功")
                            res.redirect('/')
                        }
                    })
                    // fs.writeFile(filename, data, 'binary', function(err) {
                    //     if (err) {
                    //         req.flash("error", "插入1失败")
                    //         res.redirect('back')
                    //     } else {
                    //         fields.avatar = './images/' + files.avatar.name; //插入内容
                    //         ZhuCeDengLuModel.create(fields, function(err, doc) {
                    //             if (err) {
                    //                 res.redirect('back')
                    //             } else {
                    //                 //把保存的用户 放到此用户的user属性上
                    //                 req.session.user = doc
                    //                 req.flash("success", "注册成功")
                    //                 res.redirect('/')
                    //             }
                    //         })
                    //     }
                    // })
            }
        })
    })
});





/*登录  http://localhost:3000/users/login  ------------------------ ------------------------ ------------------------*/
router.get('/login', validata.checkNotLogin, function(req, res, next) {
    res.render('zhucedenglu/login', {
        title: '登录'
    })
});
// 登录 提交
router.post('/login', validata.checkNotLogin, function(req, res, next) {
    var user = req.body;
    ZhuCeDengLuModel.findOne(user, function(err, user) {
        if (err) {
            req.flash("error", "登录失败")
            res.redirect('back')
        } else {

            req.session.user = user //设置显示状态
            req.flash("success", "登录成功")
            res.redirect('/')
        }
    })
});




//退出 ------------------------ ------------------------ ------------------------ ------------------------ ------------------------
router.get('/logout', validata.checkLogin, function(req, res, next) {
    req.session.user = null; //
    req.flash("success", "退出成功")
    res.redirect('/')
});
module.exports = router;