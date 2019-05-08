'use strict'
var fs = require('fs');

function copy(src, target) {
    //读文件     如果是图片就不能用utf8' ,用binary  不知道就不用写
    fs.readFile(src, 'binary', function (err, data) {
        fs.writeFile(target, data,'binary', function (err) {
            console.log("把" + src + "复制到" + target)
        })
    })
}
copy("./zt.png", "./zt2.png");