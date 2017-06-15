https://coding.net/u/pamzer156/p/201701node/git  代码地址

runtime 运行时

node -v 显示版本

下载node都会有一个npm

npm -v 查看版本

## 配置环境变量
 计算机 -- 属性 -- 高进系统设置 -- 环境变量 -- path 可以更改环境变量
## 是让js运行在服务器的环境
— conmmonjd规范 模块的定义(js模块) 使用一个模块 （require）导出模块
— 提供一个专门操作文件的fs
- v8引擎 不用考虑兼容性问题
- 速度快 非堵塞的异步io
## api接口
-后台定义一些数据，前台可以通过ajax来获取数据
-ajax（异步不刷新）；

## crm用户(管理系统) 增删改成
ERP企业管理系统 CMS内容发布系统 OA办公系统

##  使用第三方模块

## 配置新建的文件类型
文件夹—— new —— file

## 获取所有内容
/getList  接口 url地址 获取接口
{code:0,data:[],msg:"成功"}

## 删除某个用户  删除成功后返回空数组即可
/removeInfo?id=3
{code:0,data:'',msg:"成功"}

## 新增某个用户POST
通过请求体传递数据
/addInfo 添加成功后返回哪一项，收到数据后服务端会增加一个id
{code:0,data:[],msg:"成功"}

# 修改用户 put
既要通过url 还要通过请求体
/updateInfo?id=1   改成什么样放到请求体中

-查询单个用户
getInfo?id=1

重绘 这个会刷新页面两次
style.left="50px"
style.top = "30px"
下面会重绘一次
style.cssText ="left:30px;top:50px"


