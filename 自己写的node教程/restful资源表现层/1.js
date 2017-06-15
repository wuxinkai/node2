//资源：网络上的一个实体 每种资源对应一个特定的Url
//表现层 资源呈现出的形式叫做表现层
//状态转换 HTTp协议里 四个表现操作方式 动词对应四种基础操作
//某些动作是HTTP动词表示不了的 你就应该把动作转换为资源

var  express = require('express');
var app = express();
var users= [{id:1,name:'xxxx'},{id:2,name:'aaa'}];
app.get('/users',function(req,res){
    var accept = req.headers['accept']; //返回给前端的 编码，
    var accceptType=accept.splice(',').map(function(item){
        var values =item.splice(';')
        return {
            type:values[0],
            q:values[1]?values[1].splice('=')[1]:1
        }
    }).sort(function(a,b){
        return b.q- a.q
    })[0];
    res.send(users)
})