const http = require('http');
const url = require('url');
// const router = require('./modules/router.js');


/** 
 * 简单封装路由
*/
// http.createServer(function(req, res) {
//     // 1、获取请求url
//     let pathName = url.parse(req.url).pathname.replace('/', '');
//     console.log(router, pathName);
//     try {
//         // 2、使用封装好的路由进行数据处理
//         router[pathName](req, res);
//     } catch (e) {
//         console.log(e);
//         res.end('error');
//     }
    
// }).listen(8081);


/** 
 * 封装一个类似express的路由,就是外面可以使用以下的方式进行调用，回到router文件中编写
 * express路由使用方式：
 * const express = require('express); 引入
 * const app = express(); 实例化
 * app.get('/', function(req,res){
 *      res.send('hello world');
 * })
 * app.post('/login', function(req, res) {
 *      res.send('post world');
 * })
*/
const app = require('./modules/routes.js');
// 每一次请求url，都会调用一次服务，所以这里可以把function提出来
http.createServer(app).listen(8081);

// 运行时首先执行这个，当有请求时如加载页面，才会启动服务，即执行上面createServer的操作
app.get('/test', (req, res) => {
    console.log('get');
})