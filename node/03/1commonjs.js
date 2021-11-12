/**
 * CommonJs 就是模块化的标准，nodejs就是CommonJs（模块化）的实现
 * 
 * Node应用有模块组成，采用CommonJs模块规范
 * 在Node中，模块分为两类
 *      1、Node提供的模块，称为核心模块（系统模块），如 http模块，url模块，fs模块等，可以直接引入使用
 *      2、用户编写的模块，称为文件模块（自定义模块）
 */

 /**
  * CommonJs(NodejS)中自定义模块的规定
  * 1、我们可以把公共的功能抽离成为一个单独的js文件作为一个模块，默认情况下这个模块里面的方法或者属性，外部无法直接访问，如果要让外部可以访问模块里的方法或者属性，需要在模块里通过 exports 或者 module.exports 暴露属性或者方法
  * 2、在需要使用这些模块的文件中，通过 require 的方式引入这个模块，才可以使用这个模块中的方法或者属性
  */


// 引入module下的自定义模块
const tools = require('./module/tools.js');
// console.log(tools); // 调用
// console.log(tools.obj.add10(10));

console.log(tools);
console.log(tools.add10(10));

/**
 * 引用node_modules 下的模块
   以上三种方法均可引入模块，因为在nodejs中，会默认模块放在 node_modules 文件夹内，且默认引入目录下的 index.js 文件
   若要引入目录下的其他文件，可以进行配置，1、npm init ：生成package.json 文件  2、修改入口文件：即 main属性的内容，将其改成你需要引入的文件名
 */
const axios1 = require('./node_modules/axios/index');
const axios2 = require('axios/index');
const axios3 = require('axios');
console.log(axios1);
console.log(axios2);
console.log(axios3);

const db = require('db');
console.log(db);