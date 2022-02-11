# mongoose入门以及mongoose实现数据的增删改查
> Mongoose是在nodejs异步环境下对mongodb进行便捷操作的对象模型工具，mongoose是nodejs的驱动，不能作为其他语言的驱动
特点：
    1、通过关系型数据库的思想来设计非关系型数据库
    2、基于mongodb驱动，简化操作
## mongoose的安装及使用
    1、安装
        npm install mongoose --save
    2、引入并连接数据库
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/test');
    如果有账户密码需要采用以下连接方式
        mongoose.connect('mongodb://root:111111@localhost/test');
    3、定义Schema
    数据库中的Schema，为数据对象的集合，Schema是mongoose里会用到的一种数据形式，可以理解为表结构的定义，每个Schema会映射到mongodb中的一个collection，他不具备操作数据库的能力
        var kittySchema = mongoose.Schema({
            name: String
        });
    4、创建数据模型，即生成model。model是由Schema生成的模型，可以对数据库进行操作
        var Kitten = mongoose.model('Kitten', kittySchema);
    第一个参数：1、首字母要大写， 2、要和数据库表（集合）名称相对应
    第二个参数：上一步中定义的Schema
    第三个参数（选填）：指定的数据库表，如不指定，则默认找到名称是 model 名字 复数 形式的 collection

## mongoose的增删改查
    1、查
        User.find({}, (err, doc) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(doc);
        })
    2、增加数据
        1、实例化model，通过实例化model创建增加的数据
        const u = new User({
            user_name: '测试',
            age: 11,
            like: '无',
            grade: 2,
        });
        2、增加
        u.save(err => {
            if(err){
                console.log(err);
                return;
            }
            console.log('增加成功');
        })
    3、更新数据
        查找的条件 更细的内容 回调函数
        User.updateOne({user_name: '测试'}, {user_name: '更新测试'}, (err,res) => {
            if(err){
                console.log(err);
                return;
            }
            console.log(res);
        })
    4、删除数据
        会删除查到到的第一条
        User.deleteOne({'user_name': '测试'}, (err) => {
            if(err){
                console.log(err);
                return;
            }
            console.log('删除成功');
        })
        删除所有匹配查询条件的数据
        User.remove({ 'user_name': '测试' }, function (err) {
            if(err){
                console.log(err);
                return;
            }
            console.log('删除成功');
        });

## mongoose的默认参数
> 增加数据的时候，如果不传入数据，会使用默认配置的数据

##### 监听数据库是否连接成功
mongoose.connect('mongodb://root:111111@localhost/test', (err) => {
    if(err){
        console.log(err);
        return;
    }
    console.log('数据连接成功');
});

##### 设置默认参数
    var kittySchema = mongoose.Schema({
        name: String,
        sex: {
            type: String,
            default: '男'
        }
    });

##### 模块化
> 就是将连接数据库单独放一个文件，实例化单独放一个文件，然后去引用他，参考module.js

# mongoose预定义模式修饰符
    const userSchema = mongoose.Schema({
        user_name: {
            type: String,
            trim: true, // 定义mongoose模式修饰符：去掉收尾空格
        },
        age: Number,
        like: {
            type: String,
            default: '跑步'
        },
        grade: Number,
    });

# getters与setters自定义修饰符
> 除了mongoose内置的修饰符，我们还可以通过set（建议使用）修饰符在增加数据的时候进行格式化，也可以通过get（不建议使用）在实例获取数据（获取model数据的时候，不是获取数据库中的数据）的时候对数据进行格式化
const Pic = mongoose.Schema({
    title: {
        type: String,
        trim: true, // 定义mongoose模式修饰符：去掉收尾空格
    },
    pic: String,
    redirect: {
        type: String,
        set(params){ // 增加数据的时候，对这个字段进行处理
            // params：redirect的值     返回（return）的数据就是数据库实际保存的值
            // 在这里做逻辑处理，然后将处理后的值return出去
        }
    },
});

# mongoose索引
// 设置索引是为了优化查找速度，但是索引会影响增加数据速度
const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        // 唯一索引
        unique: true,
    },
    age: Number,
    like: {
        type: String,
        // 普通索引
        index: true,
    },
    grade: Number,
});

# mongoose内置的CURD
> http://www.mongoosejs.net/docs/api.html
扩展mongoose的静态方法和实例方法
静态方法
userSchema.statics.fn = function(sn,cb) {
    // 通过find方法获取数据   this关键字获取当前的model

}
实例方法（基本不用）
userSchema.methods.fn = function(sn,cb) {
    // 通过find方法获取数据   this关键字获取当前的model

}

# 数据校验
> 用户通过mongoose给mongodb数据库中增加数据的时候，对数据的合法性进行的校验
#### 1、mongoose校验参数
http://www.mongoosejs.net/docs/validation.html
##### 内建 Validators
    所有 SchemaTypes 都有内建 required 验证器。required 验证器使用 checkRequired() 函数 判定这个值是否满足 required 验证器
    Numbers 有 min 和 max 验证器.
    Strings 有 enum、 match、 maxlength 和 minlength 验证器

    required：表示这个数据必须传入
    max：用于Number类型数据，最大值
    min：用于Number类型数据，最小值
    enum：枚举类型，要求数据必须满足枚举值,[0,1,2...],注意：枚举是用在string类型上，对其他类型不起作用
    match：增加的数据必须符合match（正则）的规则
    maxlength：最大长度
    minlength：最小长度

    const Pic = mongoose.Schema({
        title: {
            type: String,
            trim: true, // 定义mongoose模式修饰符：去掉收尾空格
            required: true, // 表示这个数据必须传入
        },
        pic: String,
        redirect: {
            type: String,
        },
        width: {
            type: Number,
            max: 244,
            min:1,
        },
        status: {
            type: String,
            enum: [0,1,2]
        }
    });
##### 自定义验证器
    var userSchema = new Schema({
      phone: {
        type: String,
        validate: {
          validator: function(v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
          },
          message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
      }
    });

# mongoose中使用aggregate聚合管道(与原生mongodb类似)
    1、前面均一样，定义好model
    order表关联order_item
    OrderModel.aggregate([{
        $lookup: {
            from: "order_item", // 需要关联的表
            localFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段,主表中
            foreignFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段，被关联的表中
            as: "item", // 需要放到哪个字段里

        }
    }], (err, docs) => {

    })


    // 根据item表中的id去查order表中的某个值
    OrderItemModel.aggregate([{
        $lookup: {
            from: "order", // 需要关联的表
            localFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段,主表中
            foreignFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段，被关联的表中
            as: "item", // 需要放到哪个字段里

        }
    }], (err, docs) => {

    })