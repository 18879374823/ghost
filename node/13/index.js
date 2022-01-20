// 引入
const express = require('express');
// 实例化
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session')
var cookieParser = require('cookie-parser');
app.use(cookieParser('test'));
app.use(session({
    secret: 'keyboard cat', // 用于生成服务器端的签名，自定义
    resave: false, // 强制存储session，即使没有变化
    saveUninitialized: true, // 强制将未初始化的session存储
    cookie: { 
        maxAge: 60 *1000, // 过期时间
        secure: false
     } // cookie的配置，参考cookie的
  }))


app.use(express.static('static'));
app.engine('html', ejs.__express);
app.set("view engine","html");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// 配置路由

app.get('/', (req, res) => {
    // 设置cookie，到另外页面获取
    // res.cookie('name',' zhangsan',{maxAge:60*1000, path: '/login'});

    // cookie 加密
    // res.cookie('password','你好',{maxAge:60*1000, signed: true});
    
     // 获取session
     console.log(req.session.user);
    res.send("index1");
});


app.get('/login', (req, res) => {
    // 获取cookie
    // console.log(req.cookies.name);
    // 设置session
    req.session.user = '张三';
    res.render("login", {});
});

app.get('/detail', (req, res) => {
    // 获取cookie
    console.log(req.cookies.name);
    // 获取加密的cookie
    console.log(req.signedCookies.password);

   
    res.send("detail");
});

app.post('/dologin', (req, res) => {
    // 获取post传值
    console.log(req.body);
    res.send("提交成功");
});

// 监听端口
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })