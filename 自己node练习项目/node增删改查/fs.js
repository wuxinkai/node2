let fs = require('fs'); //读取文件  如果文件不存在 就会创建文件
//读文件
//var result = fs.readdirSync('./index.html','utf8'); //服务端可以用../ 网页端不可以
//写文件  默认会把对象转换字符串
    fs.writeFileSync('./as.json',JSON.stringify([{name:1},{name:1}]))
