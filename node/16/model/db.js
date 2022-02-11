/**
 * 连接数据库
 */
// 引入mongoose
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://root:111111@127.0.0.1:27017/test', (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('数据连接成功');
});

// 暴露出去
module.exports = mongoose;