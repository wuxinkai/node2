var Server = require('ws').Server

var wss = new Server({ //监听端口号
  port:8081
})
//服务器需要两个条件，
// 在特定的ip和端口上进行监听客户端的请求
// 能够根据客户端的请求进行响应

// 监听客户端请求 当有客户连接过来的时候 调用回调函数
wss.on('connection', function (ws) { 
  //监听 客户端发送过来的数据
  ws.on('message', function (message) { 
    console.log('服务器收到:%s', message);
    //服务器向客户端发消息
    ws.send('服务器回复客户端'+message)
  })
})