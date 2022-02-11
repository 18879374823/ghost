/**
 * 操作user表
 */
const mongoose = require('./db.js');
// console.log(mongoose);
const userSchema = mongoose.Schema({
    user_name: String,
    age: Number,
    like: {
        type: String,
        default: '跑步'
    },
    grade: Number,
});

module.exports = mongoose.model('User', userSchema, 'user');;