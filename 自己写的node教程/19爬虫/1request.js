var request = require('request');
var iconv = require('iconv-lite'); //解决乱码  编码转化
request({ url: 'http://top.baidu.com/category?c=10&fr=topindex', encoding: null }, function (err, response, body) {
  var result  = iconv.decode(body,'gbk');
  

  var cheerio = require('cheerio'); //在服务器中实现了jquery中的Dom造作api ，模仿jquery
  var $ = cheerio.load(result);
  // 获取表名字
  $('.hd .title a').each(function(){
    var $me = $(this);
    console.log($me.text());
});

})