import Vue from 'vue'
import App from './App.vue';
// 引入插件
import vueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(vueResource); // $http 挂载到prototype上了

new Vue({
  render: h => h(App),
}).$mount('#app')
