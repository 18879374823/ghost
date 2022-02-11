const express = require('express');
var router = express.Router();

 // 引入外部模块
const login = require('./admin/login');
const user = require('./admin/user');
const nav = require('./admin/nav');


router.get('/',(req, res) => {
    res.send('后台管理中心');
});

router.use('/login', login);
router.use('/user', user);
router.use('/nav', nav);

module.exports = router;