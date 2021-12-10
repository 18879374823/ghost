const http = require('http');
const fs = require('fs');
const path = require('path');

const tools = require('./modules/common.js');


http.createServer(function(req, res) {

    // 路径：http://localhost/index.html

    /**
     * 1、获取访问链接
     * 2、根据访问链接读取对应的文件并输出展示
     */
    /**
     * 一：初步
    const pathName = req.url;
    if(pathName != '/favicon.ico'){
        console.log(pathName);
        // 读取数据
        fs.readFile(`./html${pathName}`,(err, data) => {
            if(err) {
                // 读取文件失败
                res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
                res.end('页面不存在');
                return;
            }
            // 读取文件成功
            res.writeHead(200, {'Content-Type': 'text/html;charset="utf-8"'});
            res.end(data);
        })
    }
    */



    /**
     * 二：优化
     * 一里有几个问题
     * 1、当访问链接为 / 时，会找不到文件，需做处理
     * 2、html中引入的css无法解析,因为这个时候的type是html
     * 3、对于其他类型文件均要做处理
     */
    let pathName = req.url;
    pathName = pathName === '/' ? '/index.html' : pathName; // 匹配 / 路径
    // 获取后缀名：path.extname()
    console.log(tools);
    const extname = path.extname(pathName);

    if(pathName != 'favicon.ico'){
        fs.readFile(`./html${pathName}`, (err, data) => {
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'});
                res.end('页面不存在');
                return;
            }
            // 文件类型不能是固定的，需要根据引入的文件来处理
            const mime = tools.setFileType(extname);
            console.log(tools.setFileType, extname, mime);
            res.writeHead(200, {'Content-Type': `text/${mime};charset="utf-8"`});
            res.end(data);
        })
    }

    
}).listen(8081);