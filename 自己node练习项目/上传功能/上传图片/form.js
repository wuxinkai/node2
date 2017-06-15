var querystring = require('querystring'); //查询字符串
var fs = require('fs');
var http = require('http');
var url = require('url');

//第三方模块解析图片格式
var formidable= require('formidable');
var util= require('util');


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
    } else if (pathname == '/reg') {
        //处理html里js的ajax请求
        var result = '';  //创建一个空字符串
        req.on('data', function (data) {
            result += data;
        })
        //事件结束
        req.on('end', function (data) {
            //取出请求头的内容类型
            var contentType=req.headers['content-type'];
            //请求头是表单
            if(contentType=='application/x-www-form-urlencoded'){  //字符串格式
                var obj = querystring.parse(result);
                console.log(obj);
                //json字符串
            }else if(contentType=='application/json'){  //json格式
                var obj = JSON.parse(result);
                console.log(obj)
            }

            res.end('ok')
        })
    }else if(pathname == '/reg2'){
        //创建解析器 用来解析请求体  把非file的input放在filede里 把文件类型的元素放在filede里
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });

    }

}).listen(8083);