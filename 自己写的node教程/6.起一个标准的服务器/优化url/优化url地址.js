var http =require('http');
var fs =require('fs');
var url = require('url');
//（1）自己写的兼容
var mime={
    'html':'text/html',
    'js':'text/javascript',
    'css':'text/css'
}
var psth =require('psth')
var server = http.createServer(function(request,response){
    var url=request.url;
    response.setHeader('Content-Type',mime[psth.extname(url)]+';charset=utf8');
    fs.readFile('.'+url,'utf8',function(err,data){
        response.write(data)
        response.end()
    })
});
server.listen(10087,'localhost');

//第三方模块的兼容
var mime=require('mime'); //第三方模块  模块编码
var psth =require('psth');
var server = http.createServer(function(request,response){
    var url=request.url;
    response.setHeader('Content-Type',mime.lookup(request.url)+';charset=utf8');
    fs.readFile('.'+url,'utf8',function(err,data){
        response.write(data)
        response.end()
    })
});

server.listen(10087,'localhost');