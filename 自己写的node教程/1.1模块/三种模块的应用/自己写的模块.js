//（1）内置模块 直接用
var fs =require('fs');

//（2）自己写的模块必须加路径
var person1 = require('./person1');
var person2 = require('./person2');
console.log(person1.name1);
console.log(person2.age2);

//第三方模块 必须下载
// npm install querystring --save
var querystring = require('querystring');

