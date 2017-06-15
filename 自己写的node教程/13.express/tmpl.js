var express = require('express');
var app = express();
/*
1 动态内容 当前时间
2 静态内容 teml.html
3.动静结合
*/
app.get('/',function(req,res){

})
//渲染模板
function render(tmpl,data){
    return  tmpl.replace(/\{\{(\w+)\}\}/,function(input,groupl){
        return data[groupl]
    })
}
var  resuit=render('<h1>{{title}}</h1>',{title:'欢迎'});
console.log(resuit)