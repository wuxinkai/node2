var EventEmitter = require('events'); //事件发射器 可以发射事件  可以注册监听
var util = require('util')
//事件模式
var girl = new Girl();

function Girl(name) {
  this.name = name; //参数
  this.say = function (words) {
    console.log( this.name ,words)
  }

}
//（1）子类（Girl）继承父类 （EventEmitter）
util.inherits(Girl, EventEmitter);

// （2）实例
var one = new Girl('小明');
var tow = new Girl('小花');

//（3）监听事件  this指向one
girl.addListener('look', one.say.bind(one, '我是第一个addListener'));

//（3）也是监听函数 ,this指向tow   小明
girl.on('look', one.say.bind(tow, '这是第二个on的'))


//(4)发送事件
girl.emit('look'); 



//girl.on("监听对象","监听触发要执行的函数");
//
//girl.addListener("监听对象","监听触发要执行的函数");
//girl.emit('发布事件')
//girl.removeListener("那个事件",'事件名')