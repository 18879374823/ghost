// 用户操作
const express = require('express');
var router = express.Router();

router.get('/',(req, res) => {
    res.send('用户列表');
});

router.get('/add',(req, res) => {
    res.send('新增用户');
});

router.get('/edit',(req, res) => {
    res.send('修改用户');
});


module.exports = router;