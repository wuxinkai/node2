/*
map     替换索引的元素
filter   过滤 数组中的元素
reduce    聚合
reduceRight   从右往左聚合
some    有一个满足就可以
everyone  全部满足条件
indexOf   第一个索引
lastIndexOf  最后索引
*/

var nums =[1,2,5,3,6,2];
nums.reduce(function(current,next){
    //return current +next; //求和
    return current >next?current:next; //求最大值
},0)//0 是初始值