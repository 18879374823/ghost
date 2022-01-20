# express 框架介绍，安装，理由，动态路由get传值
> 基于 Node.js 平台，快速、开放、极简的 Web 开发框架,Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架，为 Web 和移动应用程序提供一组强大的功能

1、安装
npm install express --save
2、引用
const express = require('express');
具体使用看index.js 文件

# express 框架中ejs的使用
1、安装
npm install ejs --save
2、配置(因为已经内置了，不需要再次引入)
app.set("view engin","ejs")
3、使用（默认加载模板引擎的文件夹是views）
res.render("index", {

})

### 指定模板位置
app.set('views', __dirname+'/foldername');

### 将模板文件的后缀设置为html
1、在index.js文件中引入ejs
const ejs = require('ejs');

2、注册html模板引擎
app.engine('html', ejs.__express);

3、将模板文件换成html


# 利用express.static 托管静态文件
> 使模板文件中可以加载css，js等静态资源
使用：app.use(express.static('public')); // 如果有多个静态目录，可以多次调用