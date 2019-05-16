const mongoose = require('mongoose')//第三方模块

 mongoose.connect("mongodb://127.0.0.1/sjkName", {useNewUrlParser:true});  //sjkName 数据库的名字

//数据库连接状态
var db = mongoose.connection
db.on('error', console.error.bind(console, '数据库连接失败：'))

db.once('open', () => console.log('数据库连接成功'))

//定义一个schema 描述集合里有哪些字段 字段是什么类型的
var personSchema = new mongoose.Schema({
    username:String,
    password: String,
    code:String
},{collection:'ZhuCeDengLu'}); //指定集合名字，这样集合就不会自己创建名字

//模型  相当以所有人
var ZhuCeDengLuModel = mongoose.model("ZhuCeDengLu", personSchema); //ZhuCeDengLu 集合的名字

//放开接口
module.exports = ZhuCeDengLuModel