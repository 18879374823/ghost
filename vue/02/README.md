# 基础

## 初识Vue
1、想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
2、root容器中的代码依旧符合html规范，只是添加了一些特殊的vue语法
3、root容器中的代码被称为 Vue模板
4、Vue容器和Vue实例是一一对应的
5、真实开发中只有一个Vue实例，并且会配合着组件一起使用
6、{{XXX}} 中xxx要写js表达式，且xxx可以自动读取到data中的所有属性
7、一旦data中的数据发生改变，那么模板中用到该数据的地方也会自动更新
注意：区分js表达式和js代码（语句）
        1、表达式：一个表达式会生成一个值，可以放在任何一个需要值的地方
        2、js语句
#### 安装
1、直接用 <script> 引入
2、npm
3、cli
开始的时候用第一种方法

#### 使用
    1、下载vuejs或者cdn引入
    引入之后，全局会多一个Vue的构造函数
    2、准备一个容器
    3、创建Vue实例，并配置
        new Vue({
            el: '#root', // 用于指定当前实例为哪个容器服务，值一般为css选择器字符串
            // data中用于存储数据，数据供el指定的容器使用
            data: {
                name: 'Vue 学习'
            }
        })
> Vue.config 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改property
    如：Vue.config.productionTip = false; // 设置为 false 以阻止 vue 在启动时生成生产提示。


## Vue模板语法
Vue模板语法有两大类：
    1、插值语法：
        功能：用于解析标签体内容
        写法： {{xxx}} xxx要写js表达式，且xxx可以自动读取到data中的所有属性
    2、指令语法：
        功能：用于解析标签（包括：标签属性、标签体内容、绑定事件。。。。。。）
        如：v-bind:href="xxx" 或简写成 :href="xxx",xxx要写js表达式，且xxx可以自动读取到data中的所有属性
        Vue中有很多指令，形式为v-???
#### 插值语法

####  指令语法
 v-bind: 绑定数据，可以简写成 :
    <a v-bind:href="url">百度</a>
    <a :href="url">百度</a>

## 数据绑定
Vue中有两种数据绑定的方式：
    1、单项绑定（v-bind）：数据只能从data流向页面
    2、双向绑定（v-model）：数据不仅能从data流向页面，还可以从页面流向data
        备注：1、双向绑定一般都应用在表单类元素上，如input，select等
              2、v-model:value 可以简写为v-model,因为v-model默认收集的就是value值
v-model: 双向绑定
<input type="text" v-model="newName">
<input type="text" v-model:value="newName">

## data与el的两种写法
1、el的两种写法
    1、new Vue的时候配置el属性
    2、先创建Vue实例，随后通过 vm.$mount('#root') 指定el的值
2、data的两种写法
    1、对象式
    2、函数式


补充：vscode插件：live server
    基本类型
    数据的双向绑定