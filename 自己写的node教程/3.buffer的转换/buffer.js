
//三种构建buffer的方法
var buf1 = new Buffer(3);
console.log(buf1);
buf1.fill(0);
console.log(buf1);
buf1[0] = 0x61;
buf1[1] = 0x62;
buf1[2] = 0x63;

var buf2 = new Buffer([0x61,0x62,0x63]); //数组创建buffer

var buf3 = new Buffer("abc",'utf8'); //字符串创建buffer
console.log(buf1.toString()==buf2.toString());  //利用toString方法buffer转为字符串转
console.log(buf2.toString()==buf3.toString());

var buf4 = new Buffer("a",'utf8');
console.log(buf4);
var buf5 = new Buffer("a",'ascii');
console.log(buf5);

var str = "珠峰培训";
var buf = new Buffer(str,'utf8');
console.log(str.length);
console.log(buf.length);
console.log(buf.toString('utf8'));

str[0] = '天';
console.log(str);
console.log(buf);
/*buf[0] = 0;
 console.log(buf);*/

var newStr = str.slice(1);
var newBuff = buf.slice(1);
newBuff[1] = 5;
console.log(buf);

var buf = new Buffer(12);
buf.write("珠峰",0,6); //一个汉字三个字节， 所以是 0-6，buffer转字符串
buf.write("培训",6,6);
console.log(buf.toString());
//字符串转buffer

//截取buffer
var buffer = new Buffer("珠峰培训");
var buf1 = buffer.slice(0,7);//7  截取buffer
var buf2 = buffer.slice(7);//5
console.log(buf1.toString());
console.log(buf2.toString());

var StringDecoder = require('string_decoder').StringDecoder;
var decoder1 = new StringDecoder();
var decoder2 = new StringDecoder();
console.log(decoder1.write(buf1));
console.log(decoder2.write(buf2));

//复制buffer
var srcBuf = new Buffer([4,5,6]);
var tarBuf = new Buffer(6);
tarBuf[0] = 1;
tarBuf[1] = 2;
tarBuf[2] = 3;
srcBuf.copy(tarBuf,3,1,2);
console.log(tarBuf);

var buf1 = new Buffer([1,2,3]);
var buf2 = new Buffer([4,5,6]);
var buf = concat([buf1,buf2],6);
console.log(buf);
function concat2(arrBuffers, length){
    var buffer = new Buffer(length);
    var curIndex = 0;
    arrBuffers.forEach(function(buf){
        buf.forEach(function(b){
            buffer[curIndex++] = b;
        });
    });
    return buffer.slice(0,curIndex);
}

function concat(arrBuffers, length){
    if(arrBuffers.length==1)
        return arrBuffers[0];
    if(length == undefined){
        length = 0;
        arrBuffers.forEach(function(buf){
            length +=buf.length;
        });
    }

    var buffer = new Buffer(length);
    var curIndex = 0;
    arrBuffers.forEach(function(buf){
        buf.copy(buffer,curIndex);
        curIndex+=buf.length;
    });
    return buffer.slice(0,curIndex);
}

//合并buffer 用concat
var buffer1 = new Buffer("张三");
var buffer2 = new Buffer("吃饭");

var buffer3 = concat([buffer1, buffer2], 100);
console.log(buffer3.toString());

//判断是否是buff
Buffer.isBuffer
//获取字节长度
Buffer.byteLength("煮的饭")