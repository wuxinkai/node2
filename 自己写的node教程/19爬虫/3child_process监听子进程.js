// 启动一个新的子进程 ,监听别的进程的变化

var child_process = require('child_process')

var spawn = child_process.spawn;

var subprocess = spawn('curl', ['http://localhost:8080']);

//标准输出  获取就输出
subprocess.stdout.on('data',function(data){
  console.log(data.toString());
});

//结束进程
subprocess.on('exit',function(){
  console.log('活干完了，下班收工了');
});
//主进程 可以继续执行
console.log('continue');