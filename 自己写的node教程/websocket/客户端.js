var WebSocket = require('ws');
//监听8081 端口
var ws = new WebSocket('ws://localhost:8081')

// 连接服务器成功，调用的回调函数

ws.on('open', function () { 
  ws.send('你好服务器')
})

//监听服务器发回来的消息
ws.on('message', function (data,flags) { 
  ws.send(data)
})