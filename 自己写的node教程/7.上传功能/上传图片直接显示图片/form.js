
var fs = require('fs');
var http = require('http');
var url = require('url');

//第三方模块解析图片格式
var formidable= require('formidable');
var querystring= require('querystring'); //查询字符串
var util= require('util');
var mime= require('mime');


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
            if(contentType=='application/x-www-form-urlencoded'){
                var obj = querystring.parse(result);
                console.log(obj)
                //json字符串
            }else if(contentType=='application/json'){
                var obj = JSON.parse(result)
                console.log(obj)
            }

            res.end('ok')
        })
    }else if(pathname == '/reg2'){
        //在前端显示出来我们写的东西
        var formParser = new formidable.IncomingForm();
        formParser.parse(req,function(err,fields,files){
            fs.readFile(files.avatar.path,function(err,data){
                var filename='./imgs/'+files.avatar.name
                fs.writeFile(filename,data,function(err){
                    res.writeHead(200,{'Content-Type':'text/plain'})
                    res.end(filename)
                })
            })
        })

    }else {
        fs.exists('.'+pathname,function(exists){
            if(exists){
                //从文件名中获取content-type
                console.log(mime.lookup('.'+pathname));
                res.setHeader('Content-type',mime.lookup('.'+pathname));
                fs.readFile('.'+pathname,function(err,data){
                     res.end(data)
                })
            }else {
                res.statusCode=404;
                res.end('404')
            }
        })
    }

}).listen(8084);