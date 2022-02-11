const User = require('./model/user.js');


const u = new User({
    user_name: '修饰符测试',
    age: 11,
    grade: 2,
    like: '花花'
});
    // 2、增加
u.save(err => {
    if(err){
        console.log(err);
        return;
    }
    console.log('增加成功');
})