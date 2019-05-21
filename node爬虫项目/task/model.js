var mysql = require('mysql');
var debug = require('debug')('crawl:save');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', //公司数据库密码
  database: 'crawlmodel' //数据库的名字
})
connection.connect();

//数据库插入标题
var async = require('async');
exports.category = function (list, callback) {
  async.forEach(list, function (item, cb) {
    debug('保存分类', JSON.stringify(item));
    connection.query('replace into category(id,name,url) values(?,?,?)', [item.id, item.name, item.url], function (err, result) {
      cb();
    });
  }, callback)
}


//把文章列表存入数据库
exports.article = function (list, callback) {
  async.forEach(list, function (item, cb) {
    debug('保存文章', JSON.stringify(item));
    connection.query('replace into article(name,url,cid) values(?,?,?)', [item.name, item.url, item.cid], function (err, result) {
      cb();
    });
  }, callback);
}