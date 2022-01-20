// 引入
const express = require('express');
// 实例化
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
// 4、内置中间件
app.use(express.static('static'));
app.engine('html', ejs.__express);
app.set("view engine","html");

// 5、第三方中间件

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// 1、应用级中间件
// 主要用于权限判断
app.use(function(req,res,next){ // 默认所有的路由都会匹配到这个中间件，即所有的路由首先会去执行这个，执行完成，next(),才会继续向下执行，否则则终止

    console.log('中间件');
    next(); // 表示匹配完成这个中间件以后程序继续向下执行
})

// 配置路由

app.get('/', (req, res) => {
    const title = 'ejs 数据';
    const html = '<h1>HTML<h1>'
    const flag = false;
    const list = [
        {
            name: 'lili',
            desc: '哈哈哈哈哈哈'
        },
        {
            name: 'coco',
            desc: '呵呵呵呵呵'
        },
    ];
    res.render("index1", {title, html, flag, list});
});


app.get('/login', (req, res) => {
    res.render("login", {});
});

app.post('/dologin', (req, res) => {
    // 获取post传值
    console.log(req.body);
    res.send("提交成功");
});



// 2、路由级中间件，用的较少
// 如，正常来说，匹配到 /article/add后，就执行输出，不会继续向下匹配，如果还需要匹配后面的，则可以加一个next()
app.get('/article/add', (req, res, next) => {
    console.log('新增页面');
    next();
});

app.get('/article/:id', (req, res) => {
    const id = req.params['id'];
    res.send('动态路由:'+id);
});



// 3、错误处理中间件: 一般用于匹配完成，如全部都匹配不到，可以进行处理
app.use(function(req,res,next){
    res.status(404).send('404');
    
})





// 监听端口
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })