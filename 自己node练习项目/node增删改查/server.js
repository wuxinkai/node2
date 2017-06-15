// 1 如果 客户端请求有东西  读出来内容  写会到客户端
// 创建服务 1配置node代码提示  2配置es6语法支持  set
//vscode 和  webstrom 编辑器  代码提示和语法支持
//创建服务端 http服务  node提供模块（核心） 第三方模块
//let不能重复声明覆盖  他会产生一个块
let http = require('http'); //引用模块
let fs = require('fs'); //引用模块
let url = require('url'); //可以将路径转化为对象，pathname属性就是真正的请求路径， true就是转换对象
let mime = require('mime');

const FILE_NAME ='./data.json'; //设置常量

let listener = function(req,res){ //浏览器访问服务端 就会执行这个函数  服务端一只等客户端的到来；

    let {pathname,query} = url.parse(req.url,true);
    //使用第三方模块

    if(pathname =='/'){
        let result = fs.readFileSync('./index.html','utf8');
        res.setHeader('Content-Type','text/html;charset=utf-8');
       return res.end(result);
    }
    //读取所有用户
    //读文件 如果设置utf8 都是字符串 需要手动转成对象
    let result =  fs.readFileSync(FILE_NAME,'utf8'); //我们要操作数据 必须转化成字符串
    let final = {code:0,msg:'成功',data:''};
    //如果没有用户读取空字符串 如果没有返回空数组
    result = res.length == 0?[]:JSON.parse(result); //没东西就是空数组，有值我们把字符串转化json
//查询
    if(pathname =='/getList'){
        final.data = result;
        final.msg ="查询成功";
        res.setHeader('Content-Type','text/json;charset=utf-8');
        res.end(JSON.stringify(final));
        return;  //防止代码继续向下运行
    }
//删除
    if (pathname == '/removeInfo'){
        //获取要删除的id
        let  id = query.id;
        final.msg ='删除失败';
        final.code =1;

        for (let i=0;i<result.length;i++){
            let  data = result[i];

            if(data.id ==id){
                result.splice(i,1); //将result写入到json  前端删除
                fs.writeFileSync(FILE_NAME,JSON.stringify(result));  //后台删除
                final.msg="删除成功";
                final.code=0;
                break
            }
        }
        res.setHeader('Content-Type','text/json;charset=utf-8');
        res.end(JSON.stringify(final))
    }
//增加
    if(pathname == '/addInfo'){
        //接收请求体中的数据
        let str = '';
        req.on('data',function(data){ // 数据到来触发的函数
            str+=data;  //把传输过来的东西拼接到一起
        });
        req.on('end',function(){
            let u = JSON.parse(str); //将u放到result中
            u.id = result.length == 0?1:result[result.length-1].id+1;// 最后一项加1 json中有id
            result.push(u); //写到内存
            fs.writeFileSync(FILE_NAME,JSON.stringify(result));  //写到json中
            res.setHeader('Content-Type','text/json;charset=utf-8');
            final.msg ="增加成功";
            res.end(JSON.stringify(final))
        });
        return
    }
//查询修改
    if(pathname == '/getInfo'){
        //获取传递过来的id
        let id= query.id;
        final.code = 1;
        final.msg = '用户不存在';
        for (let i=0;i<result.length; i++){
            let  current = result[i];
            if(current.id == id){  //当前的id = 等于 传过来的id
                final.code = 0;
                final.msg = '存在';
                final.data = current; //找到的用户
                break
            }
        }
        res.setHeader('Content-Type','text/json;charset=utf-8');
        res.end(JSON.stringify(final));
        return;
    }
//修改内容
    if(pathname == '/updateInfo'){
        //获取id和请求体中的数据
        let id = query.id;
        let str = '';
        req.on('data',function(data){
            str+=data
        });
        req.on('end',function(){
           let u = JSON.parse(str);
            final.code =1;
            final.msg = '不成功';
            for (let i=0; i<result.length;i++){
                let cur = result[i];
                if(cur.id == id ){
                    result[i] =u ; //替换
                    final.code =0;
                    final.msg = '修改成功';
                    fs.writeFileSync(FILE_NAME,JSON.stringify(result));
                    break;

                }
            }
            res.setHeader('Content-Type','text/json;charset=utf-8');
            res.end(JSON.stringify(final));
        })
        return
    }

    try {
        res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
        let result = fs.readFileSync('.'+pathname);
        res.end(result);
    }catch(e){
        //如果有异常 说明服务器没有这个资源，告诉浏览器 404 not found
        res.statusCode = 404;
        res.end('not found');
    }
};
http.createServer(listener).listen(3000,function(){
    console.log('listen 3000')
}); //启动一个服务 ip默认本机 localhost
