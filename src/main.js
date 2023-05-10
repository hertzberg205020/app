import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from '@/router';
// 引入倉庫
import store from '@/store';

import TypeNav from '@/components/TypeNav';
// 引入 mockServer.js 檔案  -> mock數據
import '@/mock/mockServer';
// 引入 swiper 樣式
import 'swiper/css/swiper.css';

Vue.config.productionTip = false;

// 註冊三級連動元件為全局元件
// 第一個參數是組件名稱，第二個參數是組件對象
Vue.component(TypeNav.name, TypeNav);

new Vue({
	el: '#app',
	render: h => h(App),
	// 註冊路由外掛
	router, // 每個元件都會擁有 $router 和 $route 屬性
	// 註冊倉庫外掛
	store, // 每個元件都會擁有 $store 屬性
});
