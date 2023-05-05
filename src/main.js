import Vue from 'vue';
import App from './App.vue';

import router from '@/router';
import TypeNav from '@/pages/Home/TypeNav';

Vue.config.productionTip = false;

// 註冊三級連動元件為全局元件
// 第一個參數是組件名稱，第二個參數是組件對象
Vue.component(TypeNav.name, TypeNav);

new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
