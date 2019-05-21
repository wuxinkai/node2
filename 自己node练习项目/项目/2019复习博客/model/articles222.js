const mongoose = require('mongoose')//第三方模块

//定义一个schema 描述集合里有哪些字段 字段是什么类型的
var articlesSchema = new mongoose.Schema({
  title:String,
  content: String,
  // user: {type:mongoose.Schema.Types.ObjectId,ref:'ZhuCeDengLu'}, //引用的是ZhuCeDengLu
  user: {type: mongoose.Schema.Types.ObjectId, ref:'ZhuCeDengLu'}, //引用的是ZhuCeDengLu
  createAt: {type:Date,default:Date.now} //发表时间
}, { collection: 'articles' }); //指定集合名字，这样集合就不会自己创建名字
var articlesModel = mongoose.model("articlesModel", articlesSchema); //articles 集合的名字

//放开接口
module.exports = articlesModel