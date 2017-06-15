//判断当前 url路径是否有id参数 如果有id便是修改  没有id表示增加
//封装一个查询对象的方法
String.prototype.parseQuery = function(){
    var query={};
    this.replace(/([^?=&]+)=([^?=&]+)/,function () {
        query[arguments[1]] = arguments[2];
    });
    return query;
};
var query = window.location.search.parseQuery();

var oBtn =document.createElement('a');
var buttonsBox = document.getElementById("buttonsBox");
var id=query.id
if(id){ //有id是修改
    oBtn.innerHTML ="修改"
    //如果是修改 获取当前 数据源
    ajax({
        url:'/getInfo?id='+id,
        dataType:'json',
        success:function(res){  //{code:0,msg:0,data:{}}
            if(res &&res.code == 0){
                var u = res.data;
                username.value = u.name;
                age.value = u.age;
                phone.value = u.phone;
                address.value = u.address;
            }else { //传递的id不存在 没办法修改
                window.location.href = '/';
            }
        }
    })
}else { //没有id就是增加
    oBtn.innerHTML ="增加"
}
buttonsBox.appendChild(oBtn);

var username =document.getElementById("username");
var age =document.getElementById("age");
var phone =document.getElementById("phone");
var address =document.getElementById("address");
oBtn.onclick =function(){
    if(id){

        ajax({
            type:'put', //put修改
            dataType:'json',
            url:'/updateInfo?id='+id,
            data:JSON.stringify({
                id:id,  //传给后台后台就不需要id了
                name:username.value,
                age:age.value,
                phone:phone.value,
                address:address.value
            }),
            success:function(res){
                if(res&&res.code ==0){
                    window.location.href = '/'
                }
            }
        })

    }else {
        ajax({
            url:'/addInfo',
            dataType:'json',
            type:"post",
            data:JSON.stringify({
                name:username.value,
                age:age.value,
                phone:phone.value,
                address:address.value
            }),
            success:function(res){
                if(res&&res.code ==0 ){
                    window.location.href ='/';
                }
            }
        })
    }
}