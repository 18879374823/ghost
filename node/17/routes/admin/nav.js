// 导航操作
const express = require('express');
const path = require('path');

const  multer = require('multer');
var router = express.Router();


// const  upload  =  multer({ dest : 'static/upload/' }); // uploads:上传的目录，需要存在 以这种方式上传，后缀名会被删掉，且文件名是随机的，因此需要优化
// 优化后
const storage = multer.diskStorage({
    // 配置上传的目录
    destination: function (req, file, cb) {
      cb(null, 'static/upload')
    },
    // 修改上传后的文件名
    filename: function (req, file, cb) {
      // 1、获取后缀名  2、根据时间戳生成文件名
      const extname = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + extname)
    }
})
const upload = multer({ storage: storage })


router.get('/',(req, res) => {
    res.render('admin/nav/add', {});
});

router.post('/add',upload.single('pic'), (req, res) => { // pic这个需要和前端表单中定义的name一致，文件放在req.file中
    const body = req.body;
    const file = req.file;
    // console.log(body);
    res.send({
        body,file
    });
});

router.get('/edit',(req, res) => {
    res.send('修改导航');
});


module.exports = router;