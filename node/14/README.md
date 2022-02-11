# express 路由模块化以及express应用程序生成器

## express路由模块化
> express中允许我们通过express.Router 创建模块化的、可挂载的路由处理程序
就是我们现在的路由全部都是写在一个文件里，如果路由很多，不利于管理，所以需要将相同功能的路由抽离出来，以模块的形式进行开发
#### 实现步骤
1、定义一个路由文件，如login.js
    引入express：const express = require('express');
    实例化Router：var router = express.Router();
    加载页面
    暴露出去：module.exports = router;
2、在app.js 中引入并挂载
    const login = require('./routes/login'); // 引入外部模块
    app.use('/', login); // 挂载


# express 应用程序生成器
使用：
    1、安装 express-generator

    2、用命令生成
    express --view=ejs filename
