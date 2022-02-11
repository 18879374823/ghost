// 引入
const express = require('express');
const app = express();
app.use(express.static('static'));

const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'keyboard cat', // 用于生成服务器端的签名，自定义
    resave: false, // 强制存储session，即使没有变化
    saveUninitialized: true, // 强制将未初始化的session存储
    // 设置db库
    store: new MongoStore({
        url: 'mongodb://root:111111@127.0.0.1:27017/test',// mongodb://user12345:foobar@localhost/test-app?authSource=admin&w=1:@前面是密码:用户名，没有可以不写
        touchAfter: 24 * 3600, // 不管发出了多少请求，24小时内只更新一次session，除非你改变了session
    }),
      cookie: { 
        maxAge: 60 *1000, // 过期时间
        secure: false
    }, // cookie的配置，参考cookie的

}))







// 配置路由

app.get('/', (req, res) => {
    // 获取session
    const name = req.session.user;
    console.log(req.session.user);
    res.send("获取session:" + name);
});


app.get('/login', (req, res) => {
    req.session.user = '张三';
    res.send("设置成功");
});


// 监听端口
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })
