var express = require('express');
app = express();
app.use(require('cookie-parser')());

var session ={};
app.get('/',function(req,res){
    var sid = req.cookies.sid;

   if(sid){
       var currentSession = session[sid]
       if(currentSession == undefined){
           res.send('先清除缓存')
       }else {
           currentSession.mny =currentSession.mny-10; //每一进去 一次就减去10
           res.send(''+currentSession.mny)
       }

   }else {
       //生成新的sid
       var newid = Date.now()+''+Math.random();
       session[newid] = {mny:100};

       //写入到客户端
       res.setHeader('Set-cookie','sid='+newid);
       res.send('新朋友')
   }
})
app.listen(5050)
