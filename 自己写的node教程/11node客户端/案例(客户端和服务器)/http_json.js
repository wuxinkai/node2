// 这是客户端 要向服务器发送请求

var http = require('http');
//指定请求的参数
var options={
    host:'localhost',
    port:8080,
    path:'/post',
    method:'POST',
    headers:{}
};
//向服务器发送请求
var requert = http.request(options,function(res){
    console.log(res.statusCode);//读取响应码
    console.log(res.headers);//读取响应头

    //获取服务器发过来的数据
    var result='';
    res.on('data',function(data){
        result+=data
    });
    res.on('end',function(){
        var users=JSON.parse(result);
        //接收到的服务器内容
        console.log(users)

    })
});

// requert 也是一个流 是一个可写流
requert.write("'name':'wxk'");
requert.write(",'age':6");
//requert.write(JSON.stringify({name:'wxk'}));
requert.end();//当调用end方法的时候请求方法才会真正发出