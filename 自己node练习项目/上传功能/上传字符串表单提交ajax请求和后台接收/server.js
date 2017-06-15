var querystring = require('querystring'); //查询字符串
var fs = require('fs');
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {

    var urlObj = url.parse(req.url, true);
    //console.log(urlObj)
    //路径名
    var pathname = urlObj.pathname;

    if (pathname == '/') {
        fs.readFile('./index.html', 'utf8', function (err, data) {
            res.end(data)
        })
    } else if (pathname == '/reg') {
        //处理html里js的ajax请求
        var result = '';  //创建一个空字符串
        req.on('data', function (data) {  //接收
            result += data.toString(); //json格式的字符串
        })
        //事件结束
        req.on('end', function (data) { //接受完毕
            console.log(result);
            res.end(result) //将接收的内容返回给前端  只能接受buffer或者字符串
        })
    }

}).listen(9090);