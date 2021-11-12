/**
 * 1、新建一个package.json文件来管理（npm init || npm init --yes）
 * 2、通过npm install 下载，如：npm install md5 --save
 * 3、引入md5
 * 4、使用
 */
const md5 = require('md5');
console.log(md5(12345)); // 使用并打印

/**
 * package.json 文件介绍
 * npm install md5 --save 会将包信息配置在dependencies中
 * npm install md5 --save-dev 会将信息配置在DevDependencies中
 * "md5": "^2.3.0"前面的表示符：
 *      ^:第一位版本号不变，后面两位取最新的
 *      ~:前两位不变，最后一个取最新的
 *      *：全部取最新的
 */