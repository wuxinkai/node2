//客户端  ： 做代理和跨域的时候最有用
//http模块  帮助我们实现http服务器和客户端
//http服务器 创造服务器并指定监听请求处理函数

var urlObj = url.parse('url'); //把原始url转成对象

var queryObj = querystring.parse(); //字符串转为对象
var queryStr = querystring.stringify(); //对象转为字符串
