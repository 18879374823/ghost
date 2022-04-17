/**
 * 该文件是整个项目的入口文件
 */

//  引入Vue
import Vue from 'vue'
// 引入App组件，他是所有组件的父组件
import App from './App.vue'

// 关闭vue的生产提示
Vue.config.productionTip = false

// 创建vue实例对象：vm
new Vue({
  el: '#app', // 配置指定容器
  // 完成功能：将App组件放入容器中
  render: h => h(App),
})
