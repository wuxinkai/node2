var express = require('express');
var path = require('path');
var app =express();
app.use(express.static(__dirname));
//获取前端传过来的数据 ，转化成json
app.use(require('body-parser').json());

// 如果是 8080 / 就把index.html 返回
app.get('/',function(req,res){
    //sendfile：发送文件，如果将一个html的网页移到node工程
    res.sendFile(path.resolve('index.html')); //path.resolve()当前所在的目录出发，  把文件解析成绝对路径

});

//我们先定义几本书
var books = [{id:1,name:'node.js'}];

//增加和 查询 路由
    app.route('/books').get(function(req,res){
        res.send(books);
    //增加一个资源
    }).post((req,res) =>{  //箭头函数
        //接收post传过来的请求体
        var newBook = req.body;
        //数组的最后一项 加 1
        newBook.id = books[books.length-1].id+1;
        books.push(newBook); //简写办法
        //send就是向页面发送文本
        res.send(newBook);
       //var id = books[books.length-1]+1;
       // books.push({
       //     id:id,
       //     name:newBook
       // })
    });
//删除和修改
    app.route('/books/:id').delete((req,res)=>{
        //es6 把 删除的id 给过滤了  剩下的就是我们想要的
        books = books.filter((book)=>{
            //前台传过来的 req.params.id     book.id是全部数据    所有数据和传过来的数据进行对比
            return book.id != req.params.id;
        });
        res.send({}); //如果删除掉一个对象后返回一个空对象  这是规范
 //修改
    }).put((req,res)=>{
        books = books.map(item =>{
            if(item.id == req.params.id){
                return req.body;
            }else {
                return item;
            }
        });
        //更新成功后返回 新对象
        res.send(books)
    });

app.listen(8080,function (err) {
    console.log(8080)
});
// get 的方法名和路径名重合的话不走下边

// res.sendFile 和  res.send() 的区别
//sendfile：发送文件，如果将一个html的网页移到node工程
//send就是向页面发送文本
