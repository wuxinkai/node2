var querystring = require('querystring'); //查询字符串
var fs = require('fs');
var http = require('http');
var url = require('url');

//第三方模块解析图片格式
var formidable = require('formidable');
var util = require('util');
var mime = require('mime');


http.createServer(function (req, res) {
  //一定会返回一个对象 true的话query也是一个对象 否则就是一个字符串
  //格式是 username=wuxinkai&password=123  ---{username:'wuxinkai',{password:'123'}}
  var urlObj = url.parse(req.url, true);

  //路径名
  var pathname = urlObj.pathname;

  if (pathname == '/') {
    fs.readFile('./form.html', 'utf8', function (err, data) {
      res.end(data)
    })
  } else if (pathname == '/reg2') {
    //创建解析器 用来解析请求体  把非file的input放在filede里 把文件类型的元素放在filede里
    var form = new formidable.IncomingForm();
    //  fields普通的input元素， files图片信息
    form.parse(req, function (err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));

      fs.readFile(files.avatar.path, 'binary', function (err, data) {
        //（1）读取图片信息
        //（2）把图片返回给浏览器
        //（3）浏览器构建一个img元素 追加到body
        var filename = './imgs/' + files.avatar.name;
        fs.writeFile(filename, data, 'binary', function (err) {
          res.writeHead(200, {
            'Content-type': 'text/plain'
          })
          res.end(filename)
        })
      })
    });
  } else { //通用部分
    fs.exists('.' + pathname, function (exists) {
      if (exists) {
        //从文件名中获取content-type
        // res.setHeader('Content-type', mime.lookup('.' + pathname));
        fs.readFile('.' + pathname, function (err, data) {
          res.end(data)
        })
      } else {
        res.statusCode = 404;
        res.end('404')
      }
    })
  }

}).listen(8083);