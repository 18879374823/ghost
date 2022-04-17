import Vue from 'vue';
import App from './App.vue';

import { mixin, data } from './mixin';

Vue.config.productionTip = false;
Vue.mixin(mixin); // 全局混合，全部页面都可以直接使用
Vue.mixin(data); // 如果有多个，则再进行一次

new Vue({
    el: '#app',
    render: h => h(App),
})