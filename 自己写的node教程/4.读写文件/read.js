'use strict'
var fs = require('fs');

function copy(src, target) {
    //读文件     如果是图片就不能用utf8' ,用binary  不知道就不用写
    fs.readFile(src, 'utf8', function (err, data) {
        //写文件

        fs.writeFile(target, data, function (err) {
            console.log("把" + src + "复制到" + target)
        })
    })
}
copy("./b.js", "./a.js");