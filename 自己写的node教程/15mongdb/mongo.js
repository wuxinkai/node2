//加载mongose模块
var  mongoose= require('mongoose'); //第三方模块
//链接数据库      协议       域名      数据库名字
mongoose.connect('mongodb://127.0.0.1/2017node'); //:27017端口号可以不写    //2017node数据库的名字有就添加  没有就创建

//先创建集合骨架模型 规定一个集合的文档的字段名称和类型
//规定存储的时候字段的名称
//规定存储对象的字段类型， 如果不匹配会常识类型转换 转换成功会保存 如果转换失败就会推出
var personSchema = new mongoose.Schema({
    name:String, //姓名
    //binary:Buffer,//二进制
    //living:Boolean,//是否活着
    //birthday:Date,//生日
    age:Number,//年龄
    //_id:Schema.Types.ObjectId,  //主键
    //_fk:Schema.Types.ObjectId,  //外键 别人的主键 减少空间， 别人的主见变了这里就能查询到
    //array:[],//数组
    //arrOfString:[String],//字符串数组
    //arrOfNumber:[Number],//数字数组
    //arrOfDate:[Date],//日期数组
    //arrOfBuffer:[Buffer],//Buffer数组
    //arrOfBoolean:[Boolean],//布尔值数组
    //arrOfObjectId:[Schema.Types.ObjectId],//对象ID数组
    //nested:{ //内嵌文档
    //    name:String,
    //}
},{collection:'person'}); //指定集合的名称

//定义操作数据库的模型
var personModel = mongoose.model('Person',personSchema);

//1增加数据
var xxx=[
    { name:"zfpx1", age:1 },
    { name:"zfpx2", age:2 },
    { name:"zfpx3", age:3 },
    { name:"zfpx4", age:4 },
    { name:"zfpx5", age:5 },
    { name:"zfpx6", age:6},
    { name:"zfpx7", age:7 },
    { name:"zfpx8", age:8 },
    { name:"zfpx9", age:9},
    { name:"zfpx10",age:10 }
];

personModel.create(xxx,function(err,doc){
    //console.log(doc)
});
//personModel.create({
//    name:'张三',
//    age:8,
//    birthday: new Date,
//    home:'北京' //上面没定义写了也没用
//},function(err,doc){
//    //console.log(doc)
//});

//2第一个参数是删除条件  存放要删除的条件
//personModel.remove({age:8},function(err,result){
//    //console.log(result)
////      result: { ok: 1, n: 1 },  ok：1代表删除成功   n表示删除的数据量
//})

//3更新 改数据库的内容
//更新的时候  如果匹配的多余一条  只会更新一条
//personModel.update({age:1,name:'zfpx1'},{multi:true},{ //{multi:true} 匹配到多条就修改多少条
//    age:25,name:'wuxinkai'
//},function(err,result){
//    //console.log(result);
//    //{ ok: 1, nModified: 1, n: 1 }
//    //ok: 1 成功  nModified被修改的条数     n 准备要修改的条数
//});


//4查询
//db.person.find()
//use 2016node

//查所有
//personModel.find({},function(err,docs){
//    console.log(docs)
//})
//
//// name = zfpx4或age =5
//personModel.find({$or:[{name:'zfpx'},{age:5}]},function(err,docs){
//    console.log(docs)
//});
//属性过滤 只返回需要的字段
//第二个参数 可以包含的字段 或排除的字段 name便是字段名， 1要返回
//personModel.find({},{name:1},function(err,docs){
//
//});
//找一条后返回 不再继续查找
//personModel.findOne({_id:'584b81f5e4e15260dce4d8d6'},function(err,docs){
//
//});
////
//personModel.findById('584b81f5e4e15260dce4d8d6',function(err,docs){
//
//});

//查询
//personModel.update({age:1},{
//    $inc:{age:1},  //在原有基础上递增1
//    $set:{age:100}  //直接指定100
//},function (){
//
//});

//分页查询
var pageSize =3;
//要取第几页的数据
var pageNum = 3;
//skip 跳过指定的条数
//limit
//personModel.find().skip(pageSize*(pageNum-1)).limit(pageSize).exec(function(err,docs){
//    console.log(docs)
//})

//排序sort
personModel.find().skip(pageSize*(pageNum-1)).limit(pageSize).sort({
    age:-1 // 倒叙排列
}).exec(function(err,docs){
    console.log(docs)
})





