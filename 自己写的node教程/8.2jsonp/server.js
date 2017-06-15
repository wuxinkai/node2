var fs = require('fs');
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    console.log(urlObj.query)
    //路径名
    var pathname = urlObj.pathname;
    if (pathname == '/books') {
       var fnName = urlObj.query.dd; //传递过来的参数

        var dstudent =JSON.stringify({name:'帅哥',age:8}); //拼的是对象
            res.end(fnName+'('+dstudent+')')
    }

}).listen(8080);