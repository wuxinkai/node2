//获取所有数据插入表格中
//单利模式
var module =(function(){
    var tBody = document.getElementById("tBody");
    //初始化
    function bindHtml(datas) {
        var str = '';
        for(var i = 0; i<datas.length;i++){
            var current = datas[i];//每一个用户
            str+='<tr>';
            str+='<td>'+(i+1)+'</td>';
            str+='<td>'+current.name+'</td>';
            str+='<td>'+current.age+'</td>';
            str+='<td>'+current.phone+'</td>';
            str+='<td>'+current.address+'</td>';
            str+='<td><a data-id="'+current.id+'" >删除</a></td>';
            str+='<td><a href="/datail.html?id='+current.id+'">修改</a></td>';
            str+='</tr>';
        }
        tBody.innerHTML = str;
    };
    function bindEvent(){
        tBody.onclick =function(e){
            e = e || window.event;
            var ele = e.target || e.srcElement;
            if(ele.tagName =="A" && ele.innerHTML =="删除"){
                //
                //console.log(ele.id)
               var id = ele.getAttribute('data-id'); //获取自定义属性值
               var flag = confirm('你确定删除id为'+id+'用户吗 ');
                if(flag){ //确认删除
                    ajax({
                        url:'/removeInfo?id='+id,
                        dataType:'json',
                        success:function(res){
                            //在这里移出dom元素  用父亲删除儿子
                             if(res&&res.code==0){
                                 ele.parentNode.parentNode.parentNode.removeChild(ele.parentNode.parentNode);
                             }else {
                                 alert(res.msg);
                             }
                        }
                    })
                }
            }
        }
    }
    function init(){
        //获取所有数据
        ajax({
            url:'/getList',
            dataType:'json',
            success:function(res){ //res 代表响应的结果
                if(res && res.code == 0){  //等于0表示成功
                    var datas = res.data;
                    bindHtml(datas);
                    //删除点击事件  事件委托 添加事件
                    bindEvent()
                }

            }
        })


    }
    return{
        init:init
    }
})();
module.init();