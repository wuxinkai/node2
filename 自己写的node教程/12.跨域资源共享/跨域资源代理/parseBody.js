// //封装常用方法
module.exports=function (req,callback){
    var result='';
    req.on('data',function(data){
        result+=data
    });
    req.on('end',function(data){
        callback(result)
    })
}