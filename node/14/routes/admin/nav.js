// 导航操作
const express = require('express');
var router = express.Router();

router.get('/',(req, res) => {
    res.send('导航列表');
});

router.get('/add',(req, res) => {
    res.send('新增导航');
});

router.get('/edit',(req, res) => {
    res.send('修改导航');
});


module.exports = router;