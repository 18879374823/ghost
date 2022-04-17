# Vue  组件化编程

组件的定义：实现应用中局部功能代码和资源的集合
作用：复用编码，简化项目编码，提高运行效率
模块化：当应用中的js都以模块来编写的，那么这个应用就是一个模块话的应用
组件化：当应用中的功能都是用多组件的方式来编写的，那这个应用就是一个组件化的应用

## 非单文件组件：
    一个文件中包含有n个组件
## 单文件组件
    一个文件中只含有1个组件

Vue中使用组件的三大步骤
    1、定义组件（创建组件）
    2、注册组件
    3、使用组件（写组件标签等）
如何定义一个组件
    使用 Vue,contend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但区别如下
        1、el不要写，为什么，因为：因为最终所有的组件都要被一个vm管理，由vm决定服务哪个容器
        2、data必须写成函数，因为：避免组件被复用时，数据存在引用关系
    备注：使用template可以配置组件结构
如何注册组件;
    1、局部注册：靠new Vue 的时候传入components选项
    2、全局注册：靠Vue.component('组件名',组件)
编写组件标签
    <定义的组件名></定义的组件名>
几个注意点：
    1、关于组件名：
        一个单词组成：
            第一种写法（首字母小写）：school
            第二种写法（首字母大写）: School
        多个单词组成：
            第一种写法（kebab-case命名）：my-school
            第二种写法（CamelCase命名）：MySchool（需要Vue脚手架支持）
        备注：
            1、组件名尽量回避HTML中已有元素
            2、可以使用name配置项指定组件在开发者工具中呈现的名字
            如：
            const school = Vue.extend({
                name: 'cusName',
                template:`<div>
                        <h2>学校名称：{{ schoolName }}</h2>
                        <h2>学校地址：{{ schoolAddress }}</h2>
                        <button @click="showSchoolName">点我提示学校名</button>
                    </div>`,
                data() {
                    return {
                        schoolName: '开心就好大学',
                        schoolAddress: '深圳',
                    }
                },

            });
    2、关于组件的标签：
        第一种写法：<school></school>
        第二种写法：<school />
        备注：不使用脚手架时，<school />会导致后续组件不能渲染
    3、一个简写方式：
        const school = Vue.extend(options)可以简写成: const school = options
组件的嵌套（首次出现app）

## VueComponent构造函数
以school组件为例
1、school组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的

2、我们只需要写<school></school>或<school />,Vue解析时会帮我们创建school组件的实例对象，即帮我们执行 new VueComponent(options)

3、特别注意的是：每次调用Vue.extend，返回的都是一个全新的VueComponent

4、关于this指向：
    1、组件配置中：
        data函数，methods中的函数，watch中的函数，computed中的函数，他们的this均是【VueComponent实例对象】
    2、new Vue()配置中：
        data函数，methods中的函数，watch中的函数，computed中的函数，他们的this均是【Vue实例对象】

5、VueComponent实例对象，以后简称vc（也可称之为：组件实例对象）
    Vue的实例对象，以后简称vm
## 一个重要的内置关系
原型
1、VueComponent.prototype.__proto__ === Vue.prototype
2、为什么要有这个关系: 让组件实例对象可以访问到Vue原型上的属性，方法

## 单文件组件