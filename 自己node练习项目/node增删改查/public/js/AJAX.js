//new XMLHttpRequest;
//new ActiveXObject("Microsoft.XMLHTTP");
//new ActiveXObject("Msxml2.XMLHTTP");
//new ActiveXObject("Msxml3.XMLHTTP");

(function(){  //自执行函数 私有化
    function getXhr(){
        var ary = [
            function () {
                return new XMLHttpRequest;
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml3.XMLHTTP");
            }];
//循环数组 拿到每一个函数  让函数执行   如果报错继续执行   停止循环 获取xhr成功
        var xhr  ='';
        for (var i = 0; i < ary.length; i++) {
            var curFn = ary[i]
            try { //只能用于同步   异步不能用try catch
                xhr =curFn();
                getXhr = curFn; //【惰性载入函数】找到后将函数替换；没替换会多次执行，浪费性能
                break;
            }catch (e){ //走到catch就是不兼容此函数

            }

        }
        if(xhr ==''){
            throw Error('浏览器不支持ajax');//会中断程序的执行
        }
        return xhr  //返回xhr对象
    }
    function ajax(options){
        var _defacultOptions ={
            url:'',
            type:'get',
            dataType:'text',
            data:null,
            success:null,
            async:true,
            cache:true
        };
        for (var attr in options){
            if(options.hasOwnProperty(attr)){
                _defacultOptions[attr] = options[attr];//   _defacultOptions是默认属性；；；options是我们自己的属性
            }
        }
        var xhr = getXhr(); // UNSENT 0  OPENED 1  RECEIVE_HEADERS 2 LOADING 3 DONE 4
        if(_defacultOptions.type.toUpperCase() =='GET'&&_defacultOptions.cache){
            if( _defacultOptions.url.indexOf('?')>-1){
                _defacultOptions.url+="&_ran"+Math.random()
            }else {
                _defacultOptions.url+="?_ran"+Math.random()
            }
        }
        xhr.open(_defacultOptions.type,_defacultOptions.url,_defacultOptions.async);
        xhr.responseType = _defacultOptions.dataType;
        xhr.onreadystatechange =function(){
            if(this.readyState ==4 && /2\d{2}/.test(this.status)){
                //执行外界传递过来的 函数  bing call apply
                _defacultOptions.success.call(this,this.response)
            }
        };
        xhr.send(_defacultOptions.data);


    }
    window.ajax =ajax;
})()


//getXhr(); //每次调用都会执行try catch 浪费性能  在23行替换
//var xhr = new XMLHttpRequest;
//xhr.open('method',url?_ran=123,async);
//xhr.onreadystatechange =function(){
//    if(xhr.readyState ==4 && xhr.status ==200){
//        xhr.response //服务端最终相应结果
//    }
//}


//ajax({
//    type: 'get',  // GET PUT　DENLECT http 的四个动词
//    url: '/user', //路径
//    async: true, //是否缓存
//    cache: false, //传递的请求种数据
//    data: '',
//    succecc:function(data){ //成功回调    data代表就是xhr.response这个对象
//
//    }
//})