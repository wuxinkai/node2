
(function () { //自执行 函数的特点 私有化
    function getXhr(){
        var ary = [function () {
            return new XMLHttpRequest;
        },function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        },function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }];
//循环数组拿到每一个函数，让函数执行，如果报错继续执行，停止循环，获取xhr成功
        var xhr = '';
        for(var i=0;i<ary.length;i++){
            var curFn = ary[i]; //try catch只适合同步
            try{
                xhr = curFn();
                getXhr = curFn;//找到后将原有函数替换掉,惰性载入函数，第一次执行判断，以后不再执行
                break;
            }catch(e){} //走到catch,就是不兼容此函数
        }
        if(xhr == ''){
            throw Error('浏览器不支持ajax'); //会中断程序的执行
        }
        return xhr; //返回xhr对象
    }
    function ajax(options) {
        var _defaultOptions = {
            url:'',
            type:'get',
            dataType:'text',
            data:null,
            success:function(data){},
            async:true,
            cache:true
        };
        for(var attr in options){
            if(options.hasOwnProperty(attr)){
                _defaultOptions[attr] = options[attr];
            }
        }
        var xhr = getXhr(); //UNSENT 0 OPENED 1 RECEIVE_HEADERS 2  LOADING 3 DONE 4
        if(_defaultOptions.type.toUpperCase()=='GET'&&!_defaultOptions.cache){
            if(_defaultOptions.url.indexOf('?')>-1){
                _defaultOptions.url+='&_ran='+Math.random();
            }else{
                _defaultOptions.url+='?_ran='+Math.random();
            }
        }
        ///user?id=1&_ran=123   /user?_ran=123
        xhr.open(_defaultOptions.type,_defaultOptions.url,_defaultOptions.async);
        xhr.responseType = _defaultOptions.dataType;
        xhr.onreadystatechange = function () { //异步ajax 通过回调函数处理
            if(this.readyState == 4 && /2\d{2}/.test(this.status)){
                //执行外界传递过来的 函数，将数据传入
                _defaultOptions.success.call(this,this.response);
                //bind call apply
            }
        };
        xhr.send(_defaultOptions.data);
    }
    window.ajax = ajax;
})();
//getXhr(); //每次调用都会执行一遍try catch,第一次我们已经可以确定哪个兼容，函数的覆盖
/*
 * var xhr = new XMLHttpRequest;
 * xhr.open('method',url?_ran=123,async);
 * xhr.onreadystatechange = function(){
 *   if(xhr.readyState == 4 && xhr.status == 200){
 *        xhr.response 服务端最终响应的结果
 *   }
 * }
 * xhr.send(data);send方法中传递的如果是对象 会自动的toString();
 * */
/*
 ajax({
 type:'get', //GET PUT DELETE POST http的四个动词， （RESTFul风格）
 url:'/user', //路径
 async:true,//是否异步
 cache:false,//是否缓存
 data:'', //传递的请求中的数据
 success:function(data){
 // data 代表的就是xhr.response这个对象
 }// 成功后的回调
 });
 */


