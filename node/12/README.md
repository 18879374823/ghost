# express 中间件
> 中间件就是匹配路由之前或者匹配路由完成做的一系列操作，如果中间件想往下匹配的话，需要写next();
express 应用可使用如下几种中间件
1、应用级中间件
2、路由级中间件
3、错误处理中间件
4、内置中间件
5、第三方中间件

# 第三方中间件
> body-parser ：获取post提交的数据
1、安装
npm i body-parse --save
2、引入
const bodyParse = require('body-parse');
3、配置中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
