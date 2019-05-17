//加载模块
// var mongoose = require('mongoose'); 
const mongoose = require('mongoose')//第三方模块
//2 启动  mongod
//链接数据库      sjkName数据库名字   ：27017端口 不指定就是默认的
 mongoose.connect("mongodb://127.0.0.1/sjkName", {useNewUrlParser:true});  //sjkName 数据库的名字

//数据库连接状态
var db = mongoose.connection
db.on('error', console.error.bind(console, '数据库连接失败：'))

db.once('open', () => console.log('数据库连接成功'))

//定义一个schema 描述集合里有哪些字段 字段是什么类型的
var personSchema = new mongoose.Schema({
    name:String,
    age:Number,
    email:String,
}, { collection: 'person' });

//模型  相当以所有人
var PersonModel = mongoose.model("Person", personSchema); //Person 集合的名字
//根据模型创建实体   相当于一个人
// PersonModelEntity= new  PersonModel({
//    name:'黄晓明',
//    age:30,
//    email:'32709230@qq.com'
// })
// //
// ////把内容保存到数据库中
// PersonModelEntity.save(function (error,doc) {
//    if(error){
//        console.log("error:"+error)
//    }else {
//        console.log(doc)
//    }
// })

//(1)查询 若没有向find传递参数，默认的是显示所有文档
// PersonModel.find({},function(error,docs){

//    if(error){
//        console.log("error :" + error);
//    }else{
//        console.log(docs);
//    }
// });
//查询某一个
// findOne只查询一个数据就返回
//findId 按照id查询
//$gt、$lt(大于、小于) $ne(不等于) $ne(不等于) $or(或者) $exists(是否存在)
// _id：0就不返回
//limit:20 限制数量
//skip 跳过数量
//sort 结果排序
// PersonModel.find({ "age": 30 }, function (error, docs) {
//     if(error){
//         console.log("error :" + error);
//     }else{
//         console.log(docs); //docs: age为6的所有文档
//     }
// });
// //2插入  是个文档
// for (var i=0 ; i<=10; i++){
//     PersonModel.create({name:'wuxinkai'+i,age:i},function(err,doc){
//         if(err)console.log(err)
//         else
//         console.log(doc)
//     })
// }
// //3 更新
// var update = {$set : { age : 100 }}; //替换一个
// PersonModel.update({name : 'wuxinkai1'},{age:110} ,function(error){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log('更新成功!');
//     }
// });

// //删除
// var conditions = { name: 'wuxinkai2' };
// PersonModel.remove(conditions, function(error,docs){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(docs);
//     }
// });
// //分页 每页三条查询两页  find(查询条件，指定要返回的属性，回调函数) 查询条件
// PersonModel.find({},{id:0,name:1},{limit:3,skip:3,sort:{age:1,name:1}},function(err,doc){

// limit 限定返回多少条
// skip 跳过多少个
// sort 排序  1 代表升序  -1代表降序
PersonModel.find({}, null, { limit: 3, skip: 3, sort: { age: 1, name: 1 } },function(err,doc){ //{_id:0 代表不获取_id,id不指定就返回，1代表获取内容
    console.log(doc)
})

//返回查询的第一条就立即返回，不再查找，
// PersonModel.findOne({},{_id:0,name:1},function(err,doc){ 
//   console.log(doc)
// })

//查id

// PersonModel.findById('5cdbbe2b26bec84d80a68b11',{_id:0,name:1},function(err,doc){ 
//   console.log(doc)
// })

// $in 包含  age:{$in：6}  age:{$in:[6,7]}
// $exists 判断某些关键字段是否存在进行条件查询
// limit 限制数量

