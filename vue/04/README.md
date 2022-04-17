## 一、收集表单数据
若：<input type="text" />：则v-model收集的是value值，用户输入的就是value值
若：<input type="radio" />：则v-model收集的是value值，且要给标签配置value值
若：<input type="checkbox" />
    1、没有配置input的value属性，那么收集的就是checked（勾选或未勾选，布尔值）
    2、配置input的value属性：
        1）v-model的初始值是非数组，那么收集的就是checked（勾选或未勾选，布尔值）
        2）v-model的初始值是数组，那么收集的就是value组成的数组
备注：v-model的三个修饰符
    lazy：失去焦点再收集数据
    number：输入字符串转为有效的数字
    trim：收入首尾空格过滤

## 二、过滤器
定义：对要显示的数据进行特定格式化后再展示（适用于一些简单逻辑的处理）
语法：1、注册过滤器：Vue.filter(name, callback) 或 new Vue(filters:{})
      2、使用过滤器： {{ xxx | 过滤器名 }} 或 v-bind:属性="xxx|过滤器名"
    
备注：
    1、过滤器也可以接收额外参数，多个过滤器可以串联
    2、并没有改变原来的数据，是产生新的对应的数据

## 三、内置指令
v-text:
    1、作用：向其所在节点中渲染文本内容
    2、与插值语法的区别：v-text 会替换掉节点的内容，而 插值语法不会
v-html:
    1、作用：向指定节点中渲染包含html结构的内容
    2、与插值语法的区别：
        1）v-html会替换掉节点中的全部内容，插值语法不会
        2）v-html可以识别html结构
    3、严重注意：v-html有安全性问题
        1）在网站上主动渲染任意HTML是非常危险的，容易导致xss攻击
        2）一定要在可信的内容上使用html，永不用在用户提交的内容上
v-cloak（没有值）:
    1、本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-clock属性
    2、使用css配合v-clock可以解决网速慢时页面展示出{{xxx}} 的问题
v-once（没有值）:
    1、v-once所在节点在初次动态渲染后，就视为静态内容了
    2、以后数据的改变不会引起v-once所在结构的更新，可以用与优化性能
v-pre：
    1、跳过其所在节点的编译过程
    2、可利用他跳过：没有使用指令语法，没有使用插值语法的节点，会加快编程
## 四、自定义指令
指令中的this指向windows
定义语法;
    1、局部语法：
        new Vue({
            directives: {
                指令名：配置对象
            }
        })
        或
        new Vue({
            directives:{
                指令名:回调函数
            }
        })
    2、全局语法
        Vue.directive(指令名, 配置对象) 或 Vue.directive(指令名, 回调函数)
配置对象中常用的三个回调：
    1、bind：指令与元素成功绑定时调用
    2、inserted：指令所在元素被插入页面时调用
    3、update：指令所在莫i版结构被重新解析时调用
备注：
    1、指定定义时不加v-，使用时要加v-
    2、指令名如果是多个单词，要使用kebab-case命名方式，不要用camelClass命名

## 五、生命周期
生命周期：
    1、又名：生命周期回调函数，生命周期函数，生命周期钩子
    2、是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数
    3、生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求来编写的
    4、生命周期函数中的this指向是vm或者组件实例对象
生命周期函数
    beforeCreate，created，
    beforeMount，mounted，
    beforeUpdate，updated，
    beforeDestroy，destroyed
常用的生命周期钩子;
    1、mounted：发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
    2、beforeDestroy：清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】
关于销毁vue实例
    1、销毁后借助vue开发者工作看不到任何消息
    2、销毁后自定义事件会失效，但原生DOM事件依然有效
    3、一般不会在beforeDestroy操作数据，因为即使操作数据，也不会再出发更新数据了