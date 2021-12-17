const http = require('http');
const url = require('url');


let G = {
    _GET: {},
    _POST: {},
    staticPath: 'static', // 默认目录是static

}
let app = function(req,res) {
    //  根据请求类型来调用方法
    const methodWay = req.method;
    const pathName = url.parse(req.url,true).pathname;
    console.log('调用', methodWay, pathName);
    if(G[`_${methodWay}`][pathName]) {
        console.log('执行');
        G[`_${methodWay}`][pathName](req,res);
    } else {
        res.end('不存在的请求');
    }
    res.end('router');

}


/**
 * @param url 路由
 * @param callback 回调函数
 */
app.get = (url,callback) => {
    // 先全局注册一个方法
    G._GET[url] = callback;
}

app.post = (url,callback) => {
    // 先全局注册一个方法
    G._GET[url] = callback;
}

module.exports = app;