var http = require('http');
var URL = require('url');
var fs =require('fs');

var server = http.createServer(function(request,response){
    //将路径转化成对象
        var urlObj = URL.parse(request.url);
        //var urlObj = url.parse(request.url,true);
        console.log(urlObj.pathname); //路径前半段
        console.log(urlObj.query) ;//路径后 半段   query是查询字符串  true就转成对象

        var url=request.url;
        console.log(url);
    if(url=='/'){
        response.setHeader('Content-Type','text/html;charset=utf8');
      fs.readFile('./post.html', 'utf8', function (err, data) {
        response.write(`${data}`)
            response.end()
        })
    }else if(url=='/clock'){  //通过ajax 发送过来的数据
      //返回给前台一个时间
      
      response.end(new Date().toLocaleString())
    
  }else if(url=='/style.css'){ //在index.thml 中有个link 所以会发起二次请求
        response.setHeader('Content-Type','text/css;charset=utf8');
      fs.readFile('./style.css', 'utf8', function (err, data) {
        response.write(`${data}`)
            response.end()
        })
    }


});
server.listen(10086,'localhost');

//