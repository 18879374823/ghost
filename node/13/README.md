# express cookie 的基本使用
> cookie是存储于访问者的计算机中的变量，可以让我们用同一个浏览器访问同一个域名的时候共享数据
### 使用
1、安装模块 cookie-parser
npm i cookie-parser --save
2、引入
var cookieParser = require('cookie-parser')
3、注册
app.use(cookieParser());
4、设置
// 键名，键值，options
res.cookie('name','zhangsan',{maxAge:900000});
5、获取cookie
req.cookie.name

options值
maxAge?: number | undefined; 过期时间，ms，多长时间后过期
signed?: boolean | undefined; 是否加密
expires?: Date | undefined; 设置具体的过期时间
httpOnly?: boolean | undefined; 是否只能在node中访问，js中访问不到
path?: string | undefined; 访问目录，即只能在某个页面访问
domain?: string | undefined; 设置可共享cookie的域名，只能是二级域名 如 aaa.test.com 和 bbb.test.com  设置 '.test.com' 即可
secure?: boolean | undefined; true：在http中无效，在https中才有效
encode?: ((val: string) => string) | undefined;
sameSite?: boolean | 'lax' | 'strict' | 'none' | undefined;

signed：cookie加密
步骤
1、配置中间件的时候需要传入加密的密钥
app.use(cookieParser('test'));
2、设置
res.cookie('password','111111',{maxAge:60*1000, signed: true});
3、获取
req.signedCookies.password


# express session 的基本使用
> session 是另一种记录客户状态的机制，不同的是cookie保存在客户端浏览器中，而session保存在服务器上，所以session相比cookie要更安全一些，session是基于cookie进行工作的

>session 的工作流程：当浏览器访问服务器并发送方第一次请求时，服务器端会创建一个session对象，生成一个类似key，value的键值对，然后将key（cookie）返回到浏览器端，浏览器再次访问时，携带key，找到对应的value
### 使用
1、安装模块 
npm install express-session --save
2、引入
var session = require('express-session')
3、配置
app.use(session({
    secret: 'keyboard cat', // 用于生成服务器端的签名，自定义
    name: "test", // 修改session对应cookie的名称
    resave: false, // 强制存储session，即使没有变化
    saveUninitialized: true, // 强制将未初始化的session存储
    cookie: { 
        maxAge: 60 *1000, // 过期时间
        secure: false
     }, // cookie的配置，参考cookie的
    rolling: true, // 在每次请求时强行设置cookie，充值cookie的过期时间（默认false）
  }))

4、设置
req.session.name = '张三';
5、获取cookie
req.session.name

6、销毁session
    1: 设置过期时间为0
    req.session.cookie.maxAge = 0; // 会把所有的session都销毁
    2：销毁指定session
    req.session.user = '';  // 把session值设置为空
    3、destroy
    req.session.destroy();


# 多服务器负载均衡，session保存到数据库中
### 以mongo数据库为例，使用步骤
1、安装express-session和concent-mongo模块
npm install express-session --save
npm install connect-mongo --save
2、引入模块
const session = require('express-session');
const MongoStore = require('concent-mongo')(session);
3、配置中间件
app.use(session({
    secret: 'keyboard cat', // 用于生成服务器端的签名，自定义
    name: "test", // 修改session对应cookie的名称
    resave: false, // 强制存储session，即使没有变化
    saveUninitialized: true, // 强制将未初始化的session存储
    cookie: { 
        maxAge: 60 *1000, // 过期时间
        secure: false
     }, // cookie的配置，参考cookie的
    rolling: true, // 在每次请求时强行设置cookie，充值cookie的过期时间（默认false）

    // 设置db库
    store: new MongoStore({
        url: 'mongodb://root:111111@127.0.0.1:27017/test',// mongodb://user12345:foobar@localhost/test-app?authSource=admin&w=1:@前面是密码:用户名，没有可以不写
        touchAfter: 24 * 3600, // 不管发出了多少请求，24小时内只更新一次session，除非你改变了session
      })
  }))
4、设置成功后，会在库中有一个sessions的表，session就存储在这个表中，且有效时间与maxAge设置时间一致