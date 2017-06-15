var EventEmitter =require('events'); //事件发射器 可以发射事件  可以注册监听
var util = require('util');
//事件模式
var girl= new Girl();
function Girl(name){
    this.name =name;
    console.log(1,this.name)
    this.say = function(words){
        console.log(this.name,words)
    }

}
util.inherits(Girl,EventEmitter);
var one= new Girl('小明');
var tow= new Girl('小花');
//监听事件
girl.addListener('look',one.say.bind(one,'我是第一个addListener'));
//也是监听函数
girl.on('look',one.say.bind(tow,'这是第二个on的'));

girl.emit('look'); //发送事件



//girl.on("监听对象","监听触发要执行的函数");
//
//girl.addListener("监听对象","监听触发要执行的函数");
//girl.emit('发布事件')
//girl.removeListener("那个事件",'事件名')