/**
 * fs模块的使用
 */
const fs = require('fs');

// 1、判断服务器上有没有upload目录，如果没有的话去创建一个，有的话不进行操作(也可以用npm安装相应的包)


fs.stat('./upload', (err, data) => {
    if(err){
        // 没有这个目录名或者文件名，执行创建目录
        mkdir('./upload');
    }
    // 先判断是否是目录，如果是目录，不做操作，如果是文件，需要先删除后创建
    else if(data.isDirectory()){
        // 目录已存在
        console.log('目录已存在')
    }
    else{
        fs.unlink(path, err => {
            if(err) {
                console.log('删除文件失败');
                return;
            }
            mkdir('./upload');
        })
    }
});

function mkdir(path){
    fs.mkdir(path, err => {
        if(err) {
            return;
        }
        console.log('创建目录成功');
    })
}

fs.readdir('../../node', (err, data) => {
    console.log(data);
})