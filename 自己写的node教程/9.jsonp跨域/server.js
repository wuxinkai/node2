var fs = require('fs');
var http = require('http');
var url = require('url');
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);

    var query =urlObj.query;
    var pathname = urlObj.pathname;

    if(pathname=='/books'){
        res.end(query.callback+'(["node.js","java"])')
    }

}).listen(8080);