// 定义路由

// let route = {
//     login: (req, res) => {
//         // 做对应的逻辑操作
//         res.end('login');
//     },
//     index: (req, res) => {
//         // 做对应的逻辑操作
//         res.end('index');
//     },
//     test: (req, res) => {
//         // 做对应的逻辑操作
//         res.end('test');
//     },
// }


/**
 * 目标：能实现这样的调用
 * app.get('/test', function(req,res){
 *      res.send('hello world');
 * })
 */
let G = {};
let app = function(req,res) {
    if(G['/login']) {
        G['/login'](req,res); // 执行方法
    }
}
/**
 * 
 * @param string 路由
 *  @param cb 回调函数
 */
app.get = function(string, cb) {
    //  先要注册以下方法
    G[string] = cb;
    /**
     * G['/test'] = function(req,res) {}
     */
    console.log('get 方法')
}

module.exports = route;
