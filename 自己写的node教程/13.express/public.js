var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(__dirname+'/public'));
console.log(path.resolve())
console.log(__dirname)
//app.use(express.static(path.resolve('public')));

app.listen(8081);