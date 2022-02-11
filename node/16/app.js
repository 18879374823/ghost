// 引入mongoose
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://root:111111@127.0.0.1:27017/test');

// 定义一个Schema，Schema里的对象和数据库中表的字段需要一一对应
const userSchema = mongoose.Schema({
    user_name: String,
    age: Number,
    like: {
        type: String,
        default: '跑步'
    },
    grade: Number,
});

// 创建数据模型
// model中的第一个参数，要首字母大写，要和数据库表（集合）名称相对应，第二个参数是Schema,第三个参数可以指定数据库，如不指定，则默认找到名称是 model 名字 复数 形式的 collection
var User = mongoose.model('User', userSchema, 'user');// 可以传两个参数，也可以传三个参数

// 1、查询users表的数据
// User.find({}, (err, doc) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(doc);
// })

// 2、增加数据
    // 1、实例化model，通过实例化model创建增加的数据
const u = new User({
    user_name: '测试',
    age: 11,
    grade: 2,
});
    // 2、增加
u.save(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('增加成功');
})

// 3、修改数据
// 查找的条件 更细的内容 回调函数
// User.updateOne({user_name: '测试'}, {user_name: '更新测试'}, (err,res) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(res);
// })

// 4、删除数据
// User.deleteOne({'user_name': '测试'}, (err) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('删除成功');
// })