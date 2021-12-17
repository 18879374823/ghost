// 2、3：引入MongoClient
const MongoClient = require('mongodb').MongoClient;

// 4、定义数据库连接的地址
const url = "mongodb://localhost:27017";
// 5、定义要操作的数据库
const dbname = "test";

// 6、实例化MongoClient，传入数据库的地址
const client = new MongoClient(url);

// 7、连接数据库
client.connect((err) => {
    if(err){
        console.log('数据库连接失败', err);
        return;
    }
    console.log("数据库连接成功");
    // 8、实例化数据库,并切换到对应的数据
    let db = client.db(dbname);
    /**
     * 操作数据库
     */
    /**
     * 1、查询数据
     * toArray: 转成数组
     */
    db.collection("shop").find({}).toArray((err,data)=> {
        console.log(data);
        client.close();
    })


    // 9、操作完数据库后一定要关闭数据库连接
    // client.close();
})
