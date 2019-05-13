var fs = require('fs');
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  console.log(urlObj.query)
  //路径名
  var pathname = urlObj.pathname;
  if (pathname == '/') {
    fs.readFile('./jsonp.html', 'utf8', function (err, data) {
      res.end(data)
    })
  } else if (pathname == '/books') {
    // (3) 后台接收传递过来的参数 shuXingZhi 的内容
    var fnName = urlObj.query.shuXingZhi; //传递过来的参数

    var dstudent = JSON.stringify({
      name: '帅哥',
      age: 8
    }); //拼的是对象
    res.end(fnName + '(' + dstudent + ')')
  }

}).listen(8080);


//同源策略： url中的 scheme(协议) hostname(域名IP) port(端口) 必须相同 只要有一个不同 那么这个web资源就不是同源策略

/*  jsonp跨域： script可以作为一种ajax协议 发起请求， ，没有跨域限制，可以请求别的域的js，比如引用cdn的js，
    只需要script元素的src属性并且插入dom中，浏览器就会发起一个HTTP请求的src属性所指向的url

    script：不受同源策略影响
    script会自动下载并执行下载数据
    script跨域叫 JSON-Padding

    服务器返回的数据不应该是： {"baidu","tengxun","alibaba"}
    服务器返回的数据结构：functionName({"baidu","tengxun","alibaba"})

    其中 functionName必须在window下访问的名字
*/

//什么是同源侧策略
//  同源错略就是规定多个web 资源的url 中sheme（协议），hostname（域名IP），port（端口）必须相同，只要有一个不同那么这个web资源就是不同源的

//什么是跨域
    //当请求的资源url与页面的url的scheme（协议） hostname（域名或ip） port（端口）有一个不同的时候就算是跨域操作

//script 元素可以作为一种Ajax传输协议
//只要设置script元素的src属性并且插入到DOM中，浏览器就会发起一个http请求到src属性所值的url
//script 不受同源策略影响
// script 自动下载并执行 下载的数据
//使用这种script元素来进行Ajax数据的传输的技术就叫JSONP也就是json-padding

//JSONP只能是get请求不能是post请求