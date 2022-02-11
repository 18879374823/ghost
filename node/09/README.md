# MongoDb 数据库的介绍，安装，使用
> noSql,非关系型数据库
> MongoDB 是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的

## 1、安装  https://docs.mongodb.com/manual/
> 网上搜，官网下载安装，安装完成之后，需要配置环境变量，将mongodb下的lib目录加到环境变量中，否则需要到lib目录下进入命令行，启动mongodb服务

## 2、MongoDB数据库的创建，删除，表（集合）的创建删除，数据的增删改查
    1、连接mongodb,命令行内输入: mongo
    2、查看当前计算机下有哪些数据库：show dbs
        安装完成后有三个内置的数据库：admin，config，local
    3、创建数据库：
        use dbname：切换到这个数据库，需要使用这个数据库，如果这个数据库不存在，还是可以切过去，但是这个数据库还是没有创建成功的，只是切换，如果要创建成功，需要向里面插入数据
        数据库中不能直接插入数据，需要向集合（表）中插入数据
        db.col.insert({"name":"创建集合","time": "2021/1214"}): col: 集合名称
    4、删除当前数据库：db.dropDatabase()，需要先切到这个数据库中
    5、创建集合：db.createCollection(name, options)    
        name: 要创建的集合名称  
        options: 可选参数, 指定有关内存大小及索引的选项
    6、删除集合：db.collection.drop()
    7、插入数据：db.col.insert({"name":"创建集合","time": "2021/1214"})
    8、查看数据库中的集合(表)：show collections
    9、查看表里的数据：db.col.find()
    10、查询指定数据如：db.col.find({"name": "创建集合"})
    11、清空数据：db.col.remove({})
    12、排序：sort(),1:升序 -1：降序 db.col.find().sort({age: 1})
    13、查询前5条数据：db.col.find().limit(5)
    14、跳过数据：db.col.find().skip(10)
    15、获取数据的条数：db.col.find().count()

## 条件查询
    MongoDB中条件操作符有：
        (>) 大于 - $gt
        (<) 小于 - $lt
        (>=) 大于等于 - $gte
        (<= ) 小于等于 - $lte
    db.col.find({age: {$gt: 14}})
    多个条件：db.col.find({age: {$gt: 13, $lt: 15}})
    模糊查询：db.col.find({age: /"三"/}) --性能不是很好，用于少量数据，相当于 %%
    查找指定数据：db.col.find({}, {"age": 1}):只显示age一列
    { "_id" : ObjectId("61b85a6b2b0b3ddaf0fd0219"), "age" : 15 }
    { "_id" : ObjectId("61b85a7a2b0b3ddaf0fd021a"), "age" : 14 }
    { "_id" : ObjectId("61b85a862b0b3ddaf0fd021b"), "age" : 13 }

    or 查询
    db.col.find({$or: [{age: 12}, {age: 13}]}):查询age为12或者13的数据
    查找第一条数据：db.col.findOne();
    
## 修改数据
    db.col.update({"name":"张三"}, {$set:{"age": 33}}): 前面为查询的条件，即找到需要修改的数据,后面的为修改的数据

    更新所有匹配的数据：db.col.update({"name":"张三"}, {$set:{"age": 33}}, {multi: true})

## 删除数据
    db.col.remove({}): {}里写条件

## 大数据查询优化、mogodb索引、复合索引、explain分析查询速度
    explain(executionStats): 获取查询信息，主要关注花费时间字段: executionTimeMillis
    索引：对数据库表中一列或多列的值进行排序的一种结构，可以让我们查询数据变得更快
    1、查看集合索引：db.col.getIndexes()

    2、查看集合索引大小：db.col.totalIndexSize()
    3、删除集合所有索引：db.col.dropIndexes()
    4、删除集合指定索引：db.col.dropIndex("索引名称")例;db.col.createIndex({"title":1})
    5、设置索引：db.col.createIndex(keys, options)：Key 值为你要创建的索引字段，1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可
        例：db.col.createIndex({"title":1})
        以设置使用多个字段创建索引（关系型数据库中称作复合索引）：db.col.createIndex({"title":1,"description":-1})

## mongodb权限账户配置:mongodb是没有默认管理员账号，所以要先添加管理员账号，在开启权限认证。
    1、切换到对应数据库
    2、创建超级管理员用户
    db.createUser({
        user: 'admin',
        pwd: '123456',
        roles: [{role:'root', db: 'admin'}]
    })
    3、修改mongodb数据库配置文件,开启验证：bin/mongod.cfg
    在文件中配置
    security:
        authorization: enabled
    4、接着就是重启mongod实例。就是重启mongodb服务。
    5、登录
        mongo admin -u 用户名 -p 密码
        或
        db.auth('admin','123456');  //在admin数据库认证成功 用户名 密码
    

    查看用户: show users
    删除管理员：db.dropUser('admin');
    更新密码： db.updateUser('admin',{'pwd': '111111'})

#### 添加普通用户
> 一旦经过认证的用户管理员，可以使用db.createUser()去创建额外的用户。你可以分配mongodb内置的角色或用户自定义的角色给用户。这个myUserAdmin用户仅仅只有特权去管理用户和角色，myUserAdmin，如果你试图执行其他任何操作，例如在test数据库中的foo集合中去读数据，mongodb将返回错误。你创建用户的数据库（这里就是test数据库）是该用户认证数据库。尽管用户认证是这个数据库，用户依然可以有其他数据库的角色。即用户认证数据库不限制用户权限。
    db.createUser(
    ... {
    ... user:"test1",
    ... pwd: "test1",
    ... roles: [{ role: "readWrite", db: "test"}]
    ... }
    ... )

#### MongoDB数据库角色
    内建的角色
        数据库用户角色：read、readWrite;
        数据库管理角色：dbAdmin、dbOwner、userAdmin；
        集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
        备份恢复角色：backup、restore；
        所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
        超级用户角色：root // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
        内部角色：__system
    角色说明：
        Read：允许用户读取指定数据库
        readWrite：允许用户读写指定数据库
        dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
        userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
        clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
        readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
        readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
        userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
        dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
        root：只在admin数据库中可用。超级账号，超级权限


## 关系型数据库表与表之间的几种关系
> 1、一对一的关系
> 2、一对多的关系
> 3、多对多的关系

## mongodb的聚合管道
> MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。有点类似 SQL 语句中的 count(*)
> 使用聚合管道可以对集合中的文档进行变换和组合，在实际项目中，一般用来做表的关联查询，数据统计
    基本使用：db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)

#### 管道的概念
    管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。
    MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。
    表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。
    管道操作符：
        $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
        $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
        $limit：用来限制MongoDB聚合管道返回的文档数。
        $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
        $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
        $group：将集合中的文档分组，可用于统计结果。
        $sort：将输入文档排序后输出。
        $geoNear：输出接近某一地理位置的有序文档。
        $lookup：用以引入其他集合的数据（表的关联查询）
    表达式：
        $sum	计算总和。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])
        $avg	计算平均值	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])
        $min	获取集合中所有文档对应值得最小值。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}])
        $max	获取集合中所有文档对应值得最大值。	db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}])
        $push	将值加入一个数组中，不会判断是否有重复的值。	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])
        $addToSet	将值加入一个数组中，会判断是否有重复的值，若相同的值在数组中已经存在了，则不加入。	db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])
        $first	根据资源文档的排序获取第一个文档数据。	db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])
        $last	根据资源文档的排序获取最后一个文档数据	db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])
        

> $project
    db.clo.aggregate([
        // $project
        // 第一个管道，查询shop_id ，这里会把所有数据的shop_id 字段返回
        /* { "_id" : ObjectId("61bbf95fe6315b4e9eeea19e"), "shop_id" : 111111 }
        { "_id" : ObjectId("61bbf97ae6315b4e9eeea19f"), "shop_id" : 222222 }
        { "_id" : ObjectId("61bbf996e6315b4e9eeea1a0"), "shop_id" : 333333 } */
        {
            $project: { shop_id:1}
        }
    ])
> $match:查询的条件
    db.clo.aggregate([
        // $project
        // 第一个管道，查询shop_id ，这里会把所有数据的shop_id 字段返回
        /* { "_id" : ObjectId("61bbf95fe6315b4e9eeea19e"), "shop_id" : 111111 }
        { "_id" : ObjectId("61bbf97ae6315b4e9eeea19f"), "shop_id" : 222222 }
        { "_id" : ObjectId("61bbf996e6315b4e9eeea1a0"), "shop_id" : 333333 } */
        {
            $project: { shop_id:1}
        }
        // $match 查询的条件
        // 第二个管道
        /* { "_id" : ObjectId("61bbf95fe6315b4e9eeea19e"), "name" : "可乐", "shop_id" : 111111, "price" : 4, "color" : "red" }
            和上面的 $project 组合在一起
            { "_id" : ObjectId("61bbf95fe6315b4e9eeea19e"), "shop_id" : 111111 }
         */
        {
            $match: { "shop_id": 111111}
        }
    ])
> $group: 将集合中的文档进行分组，可用于统计结果
    _id（固定写法）: 后面是分组的依据，即根据什么来分组，注意$符号
    db.clo.aggregate([
        {
            $group: {_id:"$shop_id", total:{$sum:"$num"}}
        }
    ])

> $sort: 排序 -1:降序  1:升序
    db.clo.aggregate([
        {
            $sort: {"price": -1}
        }
    ])

> $limit : 返回几条数据
    db.clo.aggregate([
        {
            $limit: 1
        }
    ])

> $skip：跳过几条
    db.clo.aggregate([
        {
            $skip: 1
        }
    ])

> $lookup: 表关联
    db.clo.aggregate([
        {
            $lookup: {
                from: "clo_item", // 需要关联的表
                localFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段,主表中
                foreignFiled: "shop_id", // 关联的字段，就是可以用来作为标记的字段，被关联的表中
                as: "item", // 需要放到哪个字段里
            }
        }
    ])
    { "_id" : ObjectId("61bbf95fe6315b4e9eeea19e"), "name" : "可乐", "shop_id" : 111111, "price" : 4, "color" : "red", "item" : [ { "_id" : ObjectId("61bbfb7fe6315b4e9eeea1a4"), "shop_id" : 111111, "num" : 12, "type" : 1 }, { "_id" : ObjectId("61bbfb8ae6315b4e9eeea1a5"), "shop_id" : 111111, "num" : 13, "type" : 2 }, { "_id" : ObjectId("61bbfb95e6315b4e9eeea1a6"), "shop_id" : 111111, "num" : 14, "type" : 3 } ] }
{ "_id" : ObjectId("61bbf97ae6315b4e9eeea19f"), "name" : "雪碧", "shop_id" : 222222, "price" : 4, "color" : "green", "item" : [ { "_id" : ObjectId("61bbfbace6315b4e9eeea1a7"), "shop_id" : 222222, "num" : 10, "type" : 1 }, { "_id" : ObjectId("61bbfbb4e6315b4e9eeea1a8"), "shop_id" : 222222, "num" : 11, "type" : 2 }, { "_id" : ObjectId("61bbfbbae6315b4e9eeea1a9"), "shop_id" : 222222, "num" : 11, "type" : 3 } ] }
{ "_id" : ObjectId("61bbf996e6315b4e9eeea1a0"), "name" : "牛奶", "shop_id" : 333333, "price" : 3, "color" : "white", "item" : [ { "_id" : ObjectId("61bbfbcae6315b4e9eeea1aa"), "shop_id" : 333333, "num" : 20, "type" : 1 }, { "_id" : ObjectId("61bbfbcee6315b4e9eeea1ab"), "shop_id" : 333333, "num" : 20, "type" : 2 } ] }


## 数据库的备份与还原
    备份：
        mongodump -h dbhost -d dbname -o dbdirectory
        -h：MongoDB 所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
        -d：需要备份的数据库实例，例如：test
        -o：备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。
    恢复：
        mongorestore -h <hostname><:port> -d dbname <path>
        --host <:port>, -h <:port>：MongoDB所在服务器地址，默认为： localhost:27017
        --db , -d ：需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2
        --drop：恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！
        <path>：mongorestore 最后的一个参数，设置备份数据所在位置，例如：c:\data\dump\test。
        你不能同时指定 <path> 和 --dir 选项，--dir也可以设置备份目录。
        --dir：指定备份的目录
        你不能同时指定 <path> 和 --dir 选项。



用户名密码：root:111111