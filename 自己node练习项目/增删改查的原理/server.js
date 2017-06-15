var express = require('express');
var app =express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

// 模板
var path = require('path'); // 取当前目录的决对路径
app.set('view engine','ejs');//设置模板引擎 为ejs的
app.set('views',path.resolve());//path.resolve当前的工作目录
//存放用户
var users=[{id:1,name:'zfpx1'},{id:2,name:'zfpx2'}]; //json格式
//（1）获取查询所有的用户
app.get('/',function(req,res){
    //Accept:text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
    var accept = req.headers['accept']; //得到请求头
    // Accept 都是用逗号隔开
   var acceptType = accept.split(',').map(function(item){ //对请求头进行才分
        //用分号分开
       var values = item.split(';');
        return {
            //类型
            type:values[0],
            //权重 默认是1  取第一个元素 没有值的话是1  有值的话我们还的拆分，安装等号分割去第一个元素
            q: values[1] ? values[1].split('=')[1] : 1
        }
    }).sort(function(a,b){ //排序权重高往前排
        return b.q - a.q
    })[0].type; //第0个是权重最高的
    console.log(acceptType);
    if(acceptType=='text/plain'){
        res.setHeader('Content-Type',acceptType); // 系统自动设置  我们手动设置更准确设置响应头
        res.send(users)
    }else if(acceptType=='text/html'){
        res.setHeader('Content-Type',acceptType);
        res.render('users.ejs',{
            users:users
        })
    }

    //res.send(users)  // 注释这一行 Error: Can't set headers after they are sent.
});
//(2) 查询用户
//http://localhost:8080/a/2
app.get('/a/:id',function(req,res){
        var id=req.params.id;
        var filteredUsers = users.filter(function(user){
            // 数据库的 id 和我们传过来的id进行对比
            return user.id == id
        });
        console.log(id)
        res.send(filteredUsers.length>0?filteredUsers[0]:'有数据返回第一个，没数据返回这段话')
});
//（3）post新增用户
app.post('/b',function(req,res){
    var addedUser = req.body;
    if(addedUser){ //有值的时候
        //为新增用户增加id
        addedUser.id=users[users.length-1].id+1 //获取是整个数组最后一个的id加1
        users.push(addedUser);
        //新增加一个资源的时候返回新生产的资源对象 完整对象
        res.send(addedUser)
    }else { //没有值的时候
        res.send({mas:'没有收到内容 '})
    }
});
//更新 全部属性
app.put('/c/:id',function(req,res){
    var putUser = req.body;
    if(putUser){
        for (var i=0;i<users.length;i++){
            //判断 数据库里的id 否是和我们传入进来的id是否一样
            if(users[i].id==req.params.id){
                //把老的对象整体替换成新的对象
                users[i] = putUser;
                break;
            }
        }
        res.send(putUser)
    }else {
        res.send({msg:'更新失败'})
    }
});
//局部更新  我们先找到要更新的字段 循环所有数据
app.patch('/d/:id',function(req,res){
    var updatedFields = req.body;
    if(updatedFields){
        for(var i=0;i<users.length; i++){
            //判断当前用户和用户传进来的id是否一样
            if(users[i].id==req.params.id){
                for (var attr in updatedFields){
                    //用新的值替换旧的值
                    if(updatedFields.hasOwnProperty()){ //判断是不是原型上的 ，我们只跟新自己独有的属性
                        users[i][attr] =  updatedFields[attr]
                    }
                    res.send(users[i]);
                    break;
                }
            }

        }
    }
})

//删除
app.delete('/e/:id',function(req,res){
    //var deleted=false;
    for (var i=0; i<users.length; i++ ){
       if(users[i].id==req.params.id){
           users.splice(i,1); //删除一个
           //deleted = true; //删除成功
           res.send({}); //返回一个空对象
           return;
       }
    }
    //第二种办法  相当于过滤掉了 传过来的内容
    //users = users.filter(function(user){
    //    return user.id != req.params.id;
    //})
    res.send({msg:'删除失败'})
})

app.listen(8080);
// 获取 请求头里的accexp
// map 拆分