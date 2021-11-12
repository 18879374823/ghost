
 /**
  * 1、执行nodejs文件
  * 在node中执行js文件，写一段代码，如下，进入命令行中，执行node filename,如 node index.js
  */ 
 console.log('hello nodejs');



 /**
  * 2、编写一个nodeweb应用程序
  */ 

// 引入http模块
 const http = require('http');

/* 通过http中的createServe方法创建一个服务，方法中传入两个参数，request和response。
    request：获取客户端传过来的信息
    response：给浏览器的相应信息
*/
 http.createServer((request, response) => {

    console.log(request.url); // 打印一下获取的url
    // 设置响应头：状态码，编码
    response.writeHead(200, {"Content-Type": "text/html;charset='utf-8'"});

    response.write("<head><meta charset='UTF-8'></head>");//就相当于在页面上加上了meta标签
    // 写入给页面展示的内容,相当于是html的内容，标签也是有用的，但是如果写入的是中文，这里会有乱码，为了防止乱码，需要在加上上面一句
    response.write('<h2>你好 test</h2>');

    // 给页面输入一句话，并结束响应，可以不写内容
    response.end();

 }).listen(8081);// 监听的端口




 





 