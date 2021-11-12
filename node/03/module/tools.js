/**
 * 将公共的方法封装起来，然后暴露出去
 */

// 定义方法
function formatApi(api) {
    return 'http://baidu.com/'+api;
};

// 如果有多个方法，可以放在一个对象里面
var obj = {};
obj.add10 = function(a){
    return a+10;
};

obj.del10 = function(a){
    return a-10;
}

//  暴露出去
// exports.formatApi = formatApi; // 方法一
/*
暴露出去一个对象
{ formatApi: [Function: formatApi] }
*/

// exports.obj = obj;
/**
 { obj: { add10: [Function], del10: [Function] } }
 */

// 方法二
module.exports = obj;
/**
 没有前面那一层，直接将方法暴露出去
 { add10: [Function], del10: [Function] }
 */