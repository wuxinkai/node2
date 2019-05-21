var request = require('request'); // 第三方 拉取网页内容
var cheerio = require('cheerio'); // 第三方 实现jquery功能
var iconv = require('iconv-lite'); // 第三方 把GBK转成UTF8
var debug = require('debug')('crawl:read'); //第三方 日志
var url = require('url')

/**
 * res 响应对象
 * body 响应体
 */
//-------------------------- 获取标题和id 和连接  --------------------------
exports.category = function (pathUrl, callback) {
  request({
    url: pathUrl,
    encoding: null
  }, function (err, res, body) {
    if (err) {
      return console.error(err)
    }
    //把GBK转成UTF8的字符串
    result = iconv.decode(body, 'gbk')
    //根据响应体转成dom对象
    var cheerio = require('cheerio'); //在服务器中实现了jquery中的Dom造作api ，模仿jquery
    var $ = cheerio.load(result);
    var items = [] //存储内容
    //找到标签分类进行转换

    $('.hd .title a').each(function () {

      var $me = $(this);

      var item = {
        name: $me.text().trim(), //trim() 删除空格
        url: $me.attr("href")
      }

      //获取url 的id b = 353
      var params = regParams(item.url);
      item.id = params.b;
      debug('读取分类', JSON.stringify(item));
      items.push(item);
    })
    callback(null, items); //放出接口
  })
}


// 正则 匹配
function regParams(url) {
  // ./buzz?b=1513&c=10
  var obj = {};
  var reg = /([^?&=]*)=([^?&=]*)/g;
  url.replace(reg, function (src, $1, $2) {
    obj[$1] = $2;
  })
  return obj
}

//-------------------------- 获取数据列表  --------------------------


exports.article = function (listUrl,cid,callback) {
  request({
    url: listUrl,
    encoding: null
  }, function (err, res, body) {
    if (err) {
      return console.error(err)
    }
    //把GBK转成UTF8的字符串
    result = iconv.decode(body, 'gbk')
    //根据响应体转成dom对象
    var cheerio = require('cheerio'); //在服务器中实现了jquery中的Dom造作api ，模仿jquery
    var $ = cheerio.load(result);
    var items = [] //存储内容
    //找到标签分类进行转换

    $('.item-info a').each(function () {
      var $me = $(this);
      var item = {
        name: $me.text().trim(), //trim() 删除空格
        url: $me.attr("href"),
        cid: cid
      }
      items.push(item);
      console.log(items);
    })
      callback(null, items);
  })
}