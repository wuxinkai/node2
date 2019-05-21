var read = require('./read');
var model = require('./model');
var async = require('async');
var categories = [];
var articles = [];
//标题
var pathUrl = 'http://top.baidu.com/category?c=10&fr=topindex'
//列表
// listUrl = 'http://top.baidu.com/buzz?b=7&c=10&fr=topcategory_c10'
async.series([
  //分类
  function (done) {
    read.category(pathUrl, function (err, list) {
      categories = list;
      console.log('0');
      done(err)
      
    })
    
  },
  function (done) {
    //存数据库
    console.log('1');
    model.category(categories, done)
  },
  function (done) {
    async.forEach(categories, function (category, next) {
      console.log(category);
      //写入数据库的时候把字段拼接完成
      read.article('http://top.baidu.com/buzz?b=' + category.id + '&c=10&fr=topcategory_c10', category.id, function (err, list) {
        //把每个分类下面的文章列表全部加在一起
        articles = articles.concat(list);
        next();
      })
    }, done)
  },
  function (done) {
    console.log('3');
    model.article(articles, done)
  },
], function () {
  console.log('所有任务完成');
})



//获取标题
// read.category(pathUrl, function (err,data) { 
//   console.log(data);
// })

//获取列表
// listUrl = 'http://top.baidu.com/buzz?b=7&c=10&fr=topcategory_c10'
// read.article(listUrl, function (err, data) {
//   console.log(data);
// })