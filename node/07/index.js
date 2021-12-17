/**
 * 封装路由
 * 实现：定义一个方法，实现根据url来展示不同的页面（实际就是把根据url并获取文件这块进行封装），达到实现 router('xxx.html'),即可展示页面
 */ 


/**
 * EJS模板引擎，ejs视图一般以ejs为后缀名
 * 1、安装：npm install ejs --save
 * 2、引入：const ejs = require('ejs')
 * 3、渲染：ejs.render(str, data, options); // 输出渲染后的 HTML 字符串
 *          ejs.renderFile(filename, data, options, function(err, str){})   // str => 输出渲染后的 HTML 字符串
 *          filename: 静态页面
 *          data：后台传过来的数据，在静态页面上通过语法，可以将后台传过来的数据加载到页面上
 */
// const http = require('http');
// const fs = require('fs');
// const path = require('path');
// const ejs = require('ejs');


// http.createServer(function(req, res) {
//     let pathName = req.url;
//     pathName = pathName === '/' ? '/index.html' : pathName; // 匹配 / 路径
//     const msg = 'ejs渲染的数据';
//     // const list = ['lili', 'haha']
//     const list = [
//         {name: 'lili', desc: '哈哈哈哈哈哈哈'},
//         {name: '小明', desc: '呵呵呵呵呵呵呵'},
//         {name: '小红', desc: '嘿嘿嘿嘿嘿嘿嘿'},
//         {name: '小小', desc: '哈哈哈哈哈哈哈'},
//         {name: '小黄', desc: '哈哈哈哈哈哈哈'},
//         {name: '小熊', desc: '哈哈哈哈哈哈哈'},
//     ];
//     if(pathName != 'favicon.ico'){
//         ejs.renderFile('./html/index_ejs.ejs', {list:list, msg: msg}, function(err, data){
//             res.writeHead(200, {'Content-Type': `text/html;charset="utf-8"`});
//             console.log(err,data);
//             res.end(data);
//         })
        
//     }
// }).listen(8081);



/**
 * GET: 一般用于获取数据
 * POST：用于提交数据
 */
const http = require('http');
const url = require('url');



http.createServer(function(req, res) {
    let pathName = req.url;
    // 获取get传值
    let objInput = url.parse(pathName,true);
    console.log(objInput.query);

    // 获取请求方式
    const methodWay = req;
    console.log(req.method);

    // 获取post传值
    let postData = '';
    // post请求在url里获取不到，需要去读取，且是以流的方式传送的，所以这里要进行监听
    // 1、数据接收中
    req.on('data', function(postDataChunk) {
        postData += postDataChunk;
    })
    // 2、数据接收完毕，执行回调函数
    req.on('end', function() {
        try{
            postData = JSON.parse(postData);
        } catch(e) {
            console.log(e);

        }
    })
    res.end('hello world');
}).listen(8081);