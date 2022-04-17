// 引入
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

 // 引入外部模块
const admin = require('./routes/admin');
const api = require('./routes/api');
const index = require('./routes/index');

// 配置静态目录
app.use(express.static('static'));

// 配置模板引擎
app.engine('html', ejs.__express);
app.set("view engine","html");

// 配置第三方中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 挂载login模块
app.use('/', index);
app.use('/admin', admin);
app.use('/api', api);


// 监听端口
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })