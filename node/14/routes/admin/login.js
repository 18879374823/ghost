// 导航操作
const express = require('express');
var router = express.Router();

router.get('/',(req, res) => {
    res.send('登录页');
});

router.get('/doLogin',(req, res) => {
    res.send('登录成功');
});


module.exports = router;