//(一)读取文件  同步和异步之分
//(1)异步方法
var fs = require('fs');
function afterRead(err,data){  //afterRead是回调函数
    if(err){
        //发生错误执行的方法
    }else{
        console.log(data)
    }
}
fs.readFile('./json/index.txt',afterRead)  //readFile 异步读取文件    异步有回调
// ，当所有的同步方法执行完了才执行异步方法
// 异步方法需要把回调函数传入
// 异步方法不会堵塞主线程 不会影响后续代码执行

//（1）回调函数嵌套 实现多个异步操作， 完成之后实现回调    缺点，需要时间长 代码可读性差
fs.readFile('./json/name.txt',function(err,name){   //嵌套实现 同时输出内容
    fs.readFile('./json/age.txt',function(err,age){
        console.log(age,name)
    })
})

// 第二种办法
var person ={};
function show(){
    if(Object.keys(person).length==2){
        console.log(name,name)
    }
}
fs.readFile('./json/age.txt',function(err,age){
    person.age =age;
    show()
})
fs.readFile('./json/age.txt',function(err,name){
    person.name =name;
    show()
})


//(1)同步方法
try{
    var data = fs.readFileSync('./json/index.txt','utf8')  // 同步方法 同步没有返回值
}catch(err){
    console.log(err) //容错功能
}

// ,，每一个同步方法和异步方法都是成对出现的
//同步方法会阻塞主线程的执行 在数据没有返回之前后面的代码不能执行后续代码
//他不需要传递回调函数 通过函数返回值接收结果






//(二)写文件 也分同步和异步

    //回调里的err data 是由fs.readFile决定的
var fs =require('fs')  //内容模块
    //同步方法向硬盘的文件里写入数据
    fs.writeFileSync('./write.txt','写入的数据')

    //异步方法           路径       写入的数据  防止乱码
    fs.writeFileSync('./write.txt','数据', 'utf8' ,function(err){  //只要一个参数  写入失败就是err
    })


    //flag 是表示要对此文件做何种类型操作
    //w 清空并写入
    // a 在原有基础上追加
    fs.writeFileSync('./write.txt','数据', {flag:w} ,function(err){  //只要一个参数  写入失败就是err
    })
    //node 提供追加的内置方法
    fs.appendFile('./write.txt','写入的内容')


//将一个文件复制到另一个文件
    function copy(src,target){
        //先读取
        fs.readFile(src,'文件编码(utf8)',function(err,data){
            fs.writeFile(target,data,function(err){
                if(err){
                    console.log('写入成功文件')
                }
            })
        })
    }
    copy('原文件','要复制的地方')





