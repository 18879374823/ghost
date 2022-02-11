# express 结合multer上传图片

> multer是一个nodejs中间件，用于处理multipart/form-data类型的表单数据，他主要用于上传文件
multer不会处理任何非multipart/form-data类型的表单数据

#### 使用，以nav中add路由为例
1、安装
    npm install --save multer
2、设置类型
    < form  action =" /profile " method =" post " enctype =" multipart/form-data " > 
        < input  type =" file " name =" avatar "/>
    </ form >
3、引入
    const  multer   =  require ( 'multer' )
4、实例化
    const  upload  =  multer ( {  dest : 'uploads/'  } )


# 按照日期生成上传文件目录

const storage = multer.diskStorage({
    // 配置上传的目录
    destination: function (req, file, cb) {
        // 1、获取当前日期

        // 2、按照日期生成上传图片存储目录，用第三方模块，mkdirp 模块进行创建
        // 需要注意的是，mkdirp是异步的，所以需要等待创建完毕后再向下执行

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

# 多文件上传

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})