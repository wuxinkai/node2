//导入核心木块
var http = require('http')


//创建一个服务  指定监听 每当客户端请求 到来的时候执行的函数
//1能在特定的ip 特定端口上监听 客户端请求
// 当请求到来的时候执行监听函数 并返回影响
//request 代表客户端的请求  可以从中获取 请求过来的
//response 代表向客户端发的响应 ，可以向客户端发响应

var server=http.createServer(function(request,response){  //createServer 创建服务器
        //设置编码格式
        response.setHeader('Content-Type','text/html;charset=utf-8')  //设置内容类型、

        console.log(request.method) //请求的方法 get post
        console.log(request.url) //请求的方法
        console.log(request.headers) //请求头

        //response.setHerder() //响应头 必须在响应体的上面
        response.statusCode =404  //响应码
        response.write('')  //响应体


        response.write("hello"); //向客户端发起响应  括号里只能是字符串或者buffer

        response.end() //说完话 挂掉电话   end之后就不能在write
})
//在8080端口进行监听  主机名是localhost
server.listen('8080','localhost');


//（1）一个网站的访问过程
//浏览器 微信  向服务器发送一个 http请求  先把域名解析   搜索操作系统缓存（优点提高效率，缺点  修改内容缓存读的还是旧内容   ）  读取本地host  发起dns调用   运营商dns解析   找根域 客户端通过随机端口向服务器发起TCP三次握手 建立TC链接 ，链接后浏览器就发起http请求 服务器接收到http请求 解析请求的路径和参数 经过后台的一些处理之后生成完整的响应页面 客户端（浏览器）接收到http响应  从请求中得到http响应体里的html代码 对于html代码进行解析  解析过程中遇到 引用服务器上的资源（额外的css js 图 音视频 附件）会再向服务器发起请求