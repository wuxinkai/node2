var fs = require('fs');

// 同步
// var filename = fs.readFileSync('1.txt','utf8');
// var content = fs.readFileSync(filename,'utf8');
// console.log(content);

// 异步
fs.readFile('1.txt','utf8',function(err,data){
    fs.readFile(data,'utf8',function(err,data){
        console.log(data);
    })
})

//(1)监听一个读完事件  （2）读取事件完成触发这个事件  （3）