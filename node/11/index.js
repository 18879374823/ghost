// 引入
const express = require('express');
// 实例化
const app = express();

// 配置路由
/**
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/login', (req, res) => {
    res.send('登录');
});

app.put('/update', (req, res) => { // 主要用于修改数据
    res.send('修改');
});

app.delete('/update', (req, res) => { // 主要用于删除数据
    res.send('删除');
});

// 动态路由 id可以为任意值
app.get('/article/:id', (req, res) => {
    const id = req.params['id'];
    res.send('动态路由:'+id);
});

// get 传值
app.get('/shop', (req, res) => {
    console.log(req.query); // { id: '3', username: 'lili' }
    res.send('获取动态传值:');
})
 */


/**
 * express 框架中ejs的使用
 */
/**
app.set("view engine","ejs");
// app.set('views', __dirname+'/foldername'); 指定模板目录 __dirname:获取当前路径

app.get("/", (req, res) => {
    // 模板文件  数据
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
    // 默认从views文件夹中去获取模板文件，ejs具体语法可以到index.ejs文件中看
    res.render("index", {title, html, flag, list});
})
 */


/**
 * 将模板文件的后缀设置为html
 */
// 1、在index.js文件中引入ejs
const ejs = require('ejs');

// 2、注册html模板引擎
app.engine('html', ejs.__express);
app.set("view engine","html");

// 配置静态资源目录,就可以加载css，js等静态资源
app.use(express.static('static'));

// 3、将模板文件换成html
app.get("/", (req, res) => {
    // 模板文件  数据
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
    // 默认从views文件夹中去获取模板文件，ejs具体语法可以到index.ejs文件中看
    res.render("index1", {title, html, flag, list});
})
// 监听端口
app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })