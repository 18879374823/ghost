# Vue 脚手架
> Vue脚手架是官方提供的标准化开发工具（开发平台）
安装：
    1、全局安装
        npm install -g @vue/cli
    2、切到要创建的目录下
    3、创建一个项目
        vue create projectName
    4、运行
        npm run serve

    备注：如下载缓慢可以配置淘宝镜像

## 分析脚手架结构
    |--.gitignore :git忽略文件
    |
    |--babel.config.js: babel的控制文件
    |
    |--package.json: 包管理文件
    |
    |--package-lock.json: 包版本控制文件
    |
    |--scr
        |--main.js:该文件是整个项目的入口文件
        |--App.vue:大的总组件
        |--assets: 静态资源文件，如图片等
        |--components: 组件文件
    |
    |--public
         |--index.html:页面文件

## render函数

## 修改默认配置
> 使用vue inspect > output.js 可以查看到Vue脚手架的默认配置
> 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh/config/#lintonsave
    在根目录下创建一个文件 vue.config.js, 文件名不能随便改

typore 查看markDown文件

## ref属性
1、被用来给元素或子组件注册引用信息（id的替代者）
2、应用在html标签上获取的是真实DOM，应用在组件标签上是组件实例对象
3、使用方式
    打标识：<h1 href="xxx"></h1>
    获取：this.$refs.xxx
例子：refs 文件下的App.vue文件

## props 配置
功能：让组件接收外部传过来的数据
1、传递数据：
    <Demo name="xxx" />
2、接收数据
    第一种方式（只接收）
        props: ['name']
    第二种方式（限制类型）
        props: {
            name: String
        }
    第三种方式（限制类型，限制必要性，指定默认值）
        props: {
            type: String, // 类型
            required: true, // 必要性
            default: '老王', // 默认值
        }
备注：props是只读的，Vue底层会监测你对Props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，可以将props的内容复制到data中一份，然后去修改data中的值

## mixin：混入
功能：可以把多个组件共用的配置提取成一个混入对象
使用方法：
    1、定义混入并暴露
        export const mixin = {
            data() {...},
            methods: {...},
            ...
        }
    2、使用混入
        1、全局引入: Vue.mixin(xxx);
        2、局部混入: mixins:[xxx];

## 插件
> 文档中定义：
    插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
        1、添加全局方法或者 property。如：vue-custom-element
        2、添加全局资源：指令/过滤器/过渡等。如 vue-touch
        3、通过全局混入来添加一些组件选项。如 vue-router
        4、添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
        5、一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router

功能：用于增强Vue
本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据
定义插件:
    对象.install  = function (Vue, options){
        // 1、添加全局过滤器
        Vue.filter(...)

        // 添加全局指令
        Vue.directive(...)

        // 配置全局混入
        Vue.mixin(...)

        // 添加实例方法
        Vue.prototype.$myMethod = function() {...}
    }
使用插件：
    Vue.use(xxx);

## 后面是案例，就没有写

## 组件自定义事件--子给父组件传值
1、一种组件间的通信方式，适用于：子组件给父组件传值
2、使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
3、绑定自定义事件：
    1、第一种方式：在父组件中：<Demo @demo="test" />
    2、第二种方式：在父组件中：
        mounted() { this.$refs.xxx.$on('demo', this.test) }
    3、若想让自定义事件只能出发一次，可以使用once修饰符或$once方法
4、触发自定义事件：this.$emit('test', 数据);
5、解绑自定义事件：this.$off('test');
6、组件上也可以绑定原生事件，需要使用 native 修饰符
注意：通过 this.$refs.xxx.$on('demo', this.test) 绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题

## 全局事件总线--任意组件间通信

1、一种组件间通信方式，适用于任意组件间通信
2、安装全局事件总线
    new Vue({
        el: '#app',
        render: h => h(App),
        beforeCreate(){
            Vue.prototype.$bus = this; // 安装全局事件总线
        },
    })

3、使用事件总线
    1、接收数据：A组件想接受数据，则在A组件中给$bus事件绑定自定义事件，事件的回调留在A组件自身
    2、提供数据：this.$bus.$emit('xxx', 数据)
4、最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件