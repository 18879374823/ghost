/**
 * 1、fs.stat   检测是文件还是目录
 * 2、fs.mkdir  创建目录
 * 3、fs.writeFile  创建写入文件
 * 4、fs.appendFile 追加文件
 * 5、fs.readFile   读取文件
 * 6、fs.readDir    读取目录
 * 7、fs.rename     重命名
 * 8、fs.rmdir      删除目录
 * 9、fs.unlink     删除文件
 */

const fs = require('fs');// 引入fs


 /**
  * stat：检测是文件还是目录
  * 传入两个参数： 路径，回调函数
  * 回调函数：两个参数：错误信息，返回的数据
  * 
  * isFile：判断是否是文件
  * isDirectory：判断是否是目录
  
 fs.stat('./package.json', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data);
    console.log(data.isFile()); // 是否是文件
    console.log(data.isDirectory()); // 是否是目录
 });
 */


 /**
  * mkdir：创建目录
  * 传入三个参数：将创建的目录的路径，目录权限[选题]（读写权限，默认777），回调函数
  * 回调函数：一个参数：错误信息
  * fs.mkdir('./css,(err)=>{})
  
 fs.mkdir('./css', err => {
     if(err){
         console.log(err);
         return;
     }
     console.log('success');
 })
*/


/**
 * writeFile：创建写入文件
 * 传入四个函数：将要创建的文件路径，写入的内容，options(选填)，回调函数
 * 回调函数：一个参数：错误信息
 * 
 * 如果是已存在文件，则会替换其内容
 */
// fs.writeFile('./css/style.css', '/* hello world */', err => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('write succ');
// });



/**
 * appendFile：追加文件
 * 使用与writeFile类似，不同在于，如果文件存在，会在原有内容上增加新内容，而不是替换
 */
// fs.appendFile('./css/style.css', '/* hello world */', err => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('appendFile succ');
// });



 /**
  * readFile：读取文件
  * 两个参数：文件路径，回调函数
  * 回调函数：两个参数：错误信息，返回的数据
  */
//  fs.readFile('./css/style.css', (err, data) => {
//      if(err){
//          console.log(err);
//          return;
//      }
//      console.log(data);
//      console.log(data.toString()); // 将Buffer 转成String类型
//  })



/**
  * readdir：读取目录
  * 两个参数：文件路径，回调函数
  * 回调函数：两个参数：错误信息，返回的数据
  */
//  fs.readdir('../05', (err, data) => {
//      if(err){
//          console.log(err);
//          return;
//      }
//      console.log(data); // [ 'css', 'index.js', 'package.json', 'README.md' ]
//  })



 /**
  * rename：重命名      功能：1、重命名；2、移动文件
  * 两个参数：文件路径，回调函数
  * 回调函数：两个参数：错误信息，返回的数据
  */
 fs.rename('../05', (err, data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(data); // [ 'css', 'index.js', 'package.json', 'README.md' ]
})