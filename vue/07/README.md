## 浏览器本地存储
    localStorage
    sessionStorage


1、存储内容大小一般支持5MB左右（不同浏览器可能不太一样）
2、浏览器端通过Window.sessionStorage 和Window.localStorage属性来实现本地存储机制
3、相关API
    1、xxxStorage.setItem('key', 'value');
    2、xxxStorage.getItem('key');
    3、xxxStorage.removeItem('key');
    1、xxxStorage.clear();
4、备注
    1、SessionStorage存储的内容会随着浏览器窗口关闭而消失
    2、LocalStorage存储的内容，需要手动清除才会消失
    3、xxxStorage.getItem('xxx')，如果xxx对应的value值不存在，那么getItem获取到的值是null
    4、Json.parse(null)的结果还是null

## vue脚手架配置代理
方法一：
    在vue.config.js中添加如下配置
        devServer: {
            proxy: 'https://www.baidu.com'
        }
    说明：
        优点：配置简单，请求资源时直接发给前端（8080）即可
        缺点：不能配置多个代理，不能灵活的控制请求是否走代理
        工作方式：若按照上述配置代理，当前请求力前端不存在的资源时，那么该请求会转发给服务器（优先匹配前端资源）
方法二：
    编写vue.config.js配置具体代理规则
    proxy: {
      '/api': { // 匹配所有以‘/api’ 开始的路径
        target: 'https://www.baidu.com', // 代理目标的基础路径
        pathRewrite: {'^/api':''},
        ws: true, // 用于支持websocket
        changeOrigin: true // 用于控制请求头中的host值
      },
    }
    说明：
        优点：可以配置多个代理，且可以灵活的控制请求是否走代理
        缺点：配置略微繁琐，请求资源时必须加前缀

## vue-resource(对axios的封装)
1、安装
    npm i vue-resource
2、引入（在main.js 中引入，因为是插件，需要先注册）
    import vueResource from 'vue-resource';
3、注册
    Vue.use(vueResource);

## 插槽
作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间的通信方式，适用于父组件--》子组件
分类：默认插槽，具名插槽，作用域插槽
#### 默认插槽
    父组件：
        <Categroy>
            <div>html结构</div>
        </ Categroy>
    子组件：
        <template>
            <div class="categroy">
                <!-- 定义一个插槽（挖个坑，等着组件使用者进行填充） -->
                <slot>我是默认值，当没有传递具体结构时，会展示这个，如果传了，则会覆盖这里的内容</slot>
            </div>
        </template>
#### 具名插槽
    父组件：
        <Categroy>
            <template slot=xxx>
                <a href="http">html结构</a>
            </template>
        </Categroy>
        <Categroy>
            <!-- v-slot:xxx 写法只能用在template中 -->
            <template v-slot:xxx>
                <a href="http">html结构</a>
            </template>
        </Categroy>
    子组件：
        <template>
            <div>
                <slot name="xxx">插槽默认内容</slot>
            </div>
        </template>
#### 作用域插槽
    1、理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定
    2、具体编码：
    父组件中：
        <Category2 title="电影">
            <template slot-scope="dataa">
            <ul>
                <li v-for="(item, index) in dataa.games2" :key="index">{{ item }}</li>
            </ul>
            </template>
        </Category2>
        <Category2 title="电影">
            <template slot-scope="dataa">
            <ol>
                <li v-for="(item, index) in dataa.games2" :key="index">{{ item }}</li>
            </ol>
            </template>
            
        </Category2>
        <Category2 title="电影">
            <template slot-scope="dataa">
            <h4 v-for="(item, index) in dataa.games2" :key="index">{{ item }}</h4>
            </template>
            
        </Category2>
    子组件中：
        <template>
            <div class="categroy">
                <h3>{{title}}</h3>
                <slot :games2="games2"></slot>
            </div>
        </template>
备注：作用域插槽也可以有name