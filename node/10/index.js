// 2、3:引入MongoClient
const MongoClient = require('mongodb').MongoClient;

// 4、定义数据库连接的地址
// const url = "mongodb://localhost:27017/";

var options = {
    db_user: "root",//添加的普通账户名
    db_pwd: "111111",
    db_host: "127.0.0.1",
    db_port: 27017,
    db_name: "test",//数据库名称
    useNewUrlParser: true
    };

var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
console.log(dbURL);


// 5、建立连接
MongoClient.connect(dbURL, function (err, db) {
    if (err) {
        console.log('连接错误',err)
        db.close();
        throw err
    };
    console.log('数据库已连接');
    var dbase = db.db("test");
    // 查找数据
    /**
    dbase.collection("shop"). find({}).toArray(function(err, result) { // 返回集合中所有数据
        if (err) {
            console.log("查找失败", err);
            db.close();
        };
        console.log(result);
        db.close();
    });
     */

    // 插入单条数据
    /**
    dbase.collection("shop").insertOne({"name" : "橙汁", "shop_id" : 666666, "price" : 3, "color" : "origin"},(err, res) => {
        if(err) throw err;
        console.log("插入成功", res);
        // {acknowledged: true,insertedId: new ObjectId("61c03532ae76d002410b6724")}
        db.close();
    })
     */

    // 插入多条数据
    /**
    const obj = [
        {"name" : "酱油", "shop_id" : 777777, "price" : 6, "color" : "black"},
        {"name" : "醋", "shop_id" : 888888, "price" : 6, "color" : "white"},
    ]
    dbase.collection("shop").insertMany(obj, function(err, res) {
        if (err) throw err;
        console.log("插入成功: ",res);//res.insertedCount 为插入的条数
        db.close();
    });
     */
    // {acknowledged: true,insertedCount: 2,insertedIds: {'0': new ObjectId("61c0361e6f3d3d814699a54b"),'1': new ObjectId("61c0361e6f3d3d814699a54c")}}
    

    // 更新数据
    /**
    dbase.collection("shop").updateOne({"name":"可乐"}, {$set:{"price": 10}}, function(err, res) {
        if (err) throw err;
        console.log("更新成功 ",res);
        db.close();
    });
    //{acknowledged: true,modifiedCount: 1,upsertedId: null,upsertedCount: 0,matchedCount: 1}
     */

    // 删除数据
    // dbase.collection("user").deleteOne({"name":"酱油"}, function(err, res) {
    //     if (err) throw err;
    //     console.log("删除成功 ",res);
    //     db.close();
    // });
    // { acknowledged: true, deletedCount: 1 }

    // 删除多条数据
    dbase.collection("user").deleteMany({"name":"醋"}, function(err, res) {
        if (err) throw err;
        console.log("删除成功 ",res);//res.insertedCount 为插入的条数
        db.close();
    });
    // { acknowledged: true, deletedCount: 1 }
});