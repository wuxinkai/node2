var fs = require('fs')
function copy(src,target){
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(target);
    rs.on('data',function(data){
        ws.write(data)
    });
    rs.on('end',function(data){
        ws.end()
    })
}
copy('./index.txt','./write.txt');