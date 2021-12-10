/**
 * fs中的流以及管道流
 * 以流的方式读取文件，以流的方式写入文件
 */

const fs = require('fs');


/**
 * f从文件流中读取数据
 */
// 创建一个读取流
// const readStream = fs.createReadStream('./css/style.css');
// // 监听读取的状态,如果是一个很大文件，是会分多次去读取的
// readStream.on('data', data => {
//     console.log(data.toString());
// });
// // 监听读取结束
// readStream.on('end', () => {
//     console.log('end');
// });
// // 监听读取时发生的错误
// readStream.on('error', err => {
//     console.log(err);
// })



/**
 * 写入文件
 */
// // 创建一个写入流,要写入的文件名
// const writeStream = fs.createWriteStream('./css/data.text');
// // 写入,需要写入的数据
// writeStream.write(createData());
// // 标记写入完成,便于监听写入完成,如果没有这行标记，则不会触发finish事件
// writeStream.end();
// // 监听写入完成
// writeStream.on('finish', () => {
//     console.log('写入完成');
// })


// // 创建一个数据
// function createData() {
//     var str = '';
//     for(var i = 0; i <= 500; i++){
//         str = str + '你好，这是测试数据\n';
//     }
//     return str;
// }



/**
 * 管道流：从一个流里读取数据，然后将他写入到另一个流里面
 */
// 1、先创建一个读取流
const readStream = fs.createReadStream('./upload/shore_logo.png');
// 2、再创建一个写入流
const writeStream = fs.createWriteStream('./css/shore_logo.png');
// 3、通过pipe将读取的流转到写入的流里面
readStream.pipe(writeStream);
