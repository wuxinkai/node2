var querystring = require('querystring'); //查询字符串
var fs = require('fs');
var http = require('http');
var url = require('url');
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
    }

}).listen(8080);