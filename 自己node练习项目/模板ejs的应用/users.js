var express = require('express');
var app = express();

var path = require('path')
app.set('view engine','ejs');//设置模板引擎 为ejs的
app.set('views',path.resolve());//process.cwd()当前的工作目录

 //存放用户名
var  users = [{id:1,name:'吴鑫凯1'},{id:1,name:'吴鑫凯2'},{id:3,name:'吴鑫凯3',}];
// 获取所有用户
app.get('/',function (req,res) {
    var accept = req.headers['accept'];
    var acceptType = accept.split(',').map(function(item){
      var values = item.split(';');
        return{
            type:values[0], //需要的文件类型
            q:values[1]?values[1].split('=')[1]:1 //权重 默认是1
        }
    }).sort(function (a,b) {
        return b.q-a.q
    })[0];
    if(acceptType == 'text/plain'){
        res.send(users)

    }else if(acceptType =='text/html'){
        res.render('users.ejs',{
            users:users
        })
    }else {
        res.send(users)
    }

})


app.listen(9090)