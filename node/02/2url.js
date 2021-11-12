// url模块及supervisor

/**
  * url模块
  * 获取get传过来的参数
  */
 const http = require('http');
 const url = require('url');

  // 例：
 const api = 'http://baidu.com/?user=haha&name=123';
 console.log(url.parse(api, true));
 console.log('=========================================================');
 /*
{
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'baidu.com',
  port: null,
  hostname: 'baidu.com',
  hash: null,
  search: '?user=haha&name=123',
  query: [Object: null prototype] { user: 'haha', name: '123' },
  pathname: '/',
  path: '/?user=haha&name=123',
  href: 'http://baidu.com/?user=haha&name=123'
}
*/

// 在实际服务中运行
http.createServer((request, response) => {
    const reqUrl = request.url;
    if(reqUrl != '/favicon.ico'){
        console.log(reqUrl); // /?name=haha&age=12

        const urlParase = url.parse(reqUrl, true);
        console.log(urlParase);
        /**
         从query中就可以获取传过来的参数了
        {
            protocol: null,
            slashes: null,
            auth: null,
            host: null,
            port: null,
            hostname: null,
            hash: null,
            search: '?name=haha&age=12',
            query: [Object: null prototype] { name: 'haha', age: '12' },
            pathname: '/',
            path: '/?name=haha&age=12',
            href: '/?name=haha&age=12'
        }
        */
    }
    
    response.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});

    response.write("<head><meta charset='UTF-8'></head>");
    response.write('<h2>你好 test</h2>');
    response.end();

 }).listen(8082);// 监听的端口


 /**
  * 3、实时编译
  * 修改文件后，需要重新运行才会生效，可以通过 supervisor | nodemon 进行实时编译
  * 使用：
  * 1、全局安装
  * 2、supervisor  filename | nodemon filename
  */