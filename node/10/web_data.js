// 从数据库中获取数据并渲染在页面上
const http = require('http');
const url = require('url');
const ejs = require('ejs');
const querystring = require('querystring');
const MongoClient = require('mongodb').MongoClient;
var options = {
    db_user: "root",//添加的普通账户名
    db_pwd: "111111",
    db_host: "127.0.0.1",
    db_port: 27017,
    db_name: "test",//数据库名称
    useNewUrlParser: true
    };

var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
// console.log(dbURL);

// http.createServer(function(req, res) {
//     let pathName = req.url;
//     pathName = pathName === '/' ? '/index.html' : pathName; // 匹配 / 路径
//     // 获取get传值
//     let objInput = url.parse(pathName,true);
//     console.log(objInput.query);

//     // 获取请求方式
//     const methodWay = req;
//     console.log(req.method);
//     if(pathName != 'favicon.ico'){
//         // 建立连接
//         MongoClient.connect(dbURL, function (err, db) {
//             if (err) {
//                 console.log('连接错误',err)
//                 db.close();
//                 res.end('hello world');
//             };
//             console.log('数据库已连接');
//             var dbase = db.db("test");
//             dbase.collection("shop"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//                 if (err) {
//                     console.log("查找失败", err);
//                     db.close();
//                 };
//                 console.log(result);
//                 db.close();
//                 ejs.renderFile('./html/index_ejs.ejs', {list:result, msg: "从数据库中获取数据"}, function(err, data){
//                     res.writeHead(200, {'Content-Type': `text/html;charset="utf-8"`});
//                     console.log(err,data);
//                     res.end(data);
//                 })
//             });
//         });
//     }
    
    
// }).listen(8081);

http.createServer(function(req, res) {
    let pathName = req.url;
    pathName = pathName === '/' ? '/index.html' : pathName; // 匹配 / 路径
    // console.log(pathName);
    // 获取get传值
    // let objInput = url.parse(pathName,true);
    // console.log(objInput.query);

    // 获取请求方式
    const methodWay = req.method;
    console.log(methodWay);
    if(pathName != 'favicon.ico'){
        if(pathName == '/index.html')
        ejs.renderFile('./html/index.ejs', function(err, data){
            res.writeHead(200, {'Content-Type': `text/html;charset="utf-8"`});
            console.log(err,data);
            res.end(data);
        })
        else if(pathName == '/register'){
            // 获取post传值
            let postData = '';
            // post请求在url里获取不到，需要去读取，且是以流的方式传送的，所以这里要进行监听
            // 1、数据接收中
            req.on('data', function(postDataChunk) {
                console.log(postDataChunk);
                postData += postDataChunk;
            })
            // 2、数据接收完毕，执行回调函数
            req.on('end', function() {
                try{
                    postData = postData.toString();
                    // 引入 querystring 包处理这种类型
                    postData = querystring.parse(postData); // userName=ccc&age=14
                } catch(e) {
                    console.log(e);

                }
            })
            // 将数据插入
            res.writeHead(200, {'Content-Type': `text/html;charset="utf-8"`});
            res.end('post请求');
            MongoClient.connect(dbURL, function (err, db) {
                if (err) {
                    console.log('连接错误',err)
                    db.close();
                    res.end('hello world');
                };
                console.log('数据库已连接');
                var dbase = db.db("test");
                dbase.collection('user').insertOne(postData, (err, res) => {
                    if (err) throw err;
                    console.log("插入成功: ",res);//res.insertedCount 为插入的条数
                    db.close();
                })
            });
        }
        else {
            res.writeHead(200, {'Content-Type': `text/html;charset="utf-8"`});
            res.end('路径不对');
        }
    }
    
    
}).listen(8081);