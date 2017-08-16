/**
 * 承诺 promise
 * 1. 后面的then注册的函数会覆盖前面注册的
 * 2. 如果resolve之后再注册then,则得不到值
 **/

//这件事情是一个需要延迟处理的事情
var Defer = function(){   //生成一个普通函数，
  var status = 'pending';//初始态  标示作用 没什么大的作用
  var value;//异步操作的最终的值
  var callbacks = [];//异步操作成功后的回调
  return {
      //当调用resolve的时候就表示成功了
      resolve:function(_value){//（2）异步操作完成之后调用，表示操作成功了
          value = _value;
          status = 'resolve';
          callbacks.forEach(function(callback){  //（3没有保错才会进行回调， 调用这个方法
              callback(value);
          });
          callbacks = undefined;
      },
      reject:function(){

      },
      //就是承诺的对象,它会返回给客户端
      promise:{
          then:function(_callback_){
              if(callbacks){
                  callbacks.push(_callback_);
              }else{
                  _callback_(value);
              }
          },
          catch:function(){

          }
      }
  }
}

var defer = Defer();
var fs = require('fs');
fs.readFile('1.txt','utf8',function(err,data){
    defer.resolve(data);//（1）读取文件完成后调用resolve把状态改为成功
    //  defer.reject(err);
})

var promise = defer.promise;
//（3）defer给你一个承诺，当异步操作完成之后我会调用你传给我回调函数
promise.then(function(data){
    console.log("成功后调用 "+data);
});
//当出错的时候进行的回调
promise.catch(function(errr){
    console.log("失败后的方法 "+errr);
});

