import Vue from 'vue';
import App from './App.vue';
// 引入路由
import router from '@/router';
// 引入倉庫
import store from '@/store';

import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';

// 引入 mockServer.js 檔案  -> mock數據
import '@/mock/mockServer';
// 引入 swiper 樣式
import 'swiper/css/swiper.css';
// 引入 bootstrap 樣式
// import 'bootstrap/dist/css/bootstrap.min.css'
// import "bootstrap"

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faPhone, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faUserSecret, faPhone, faArrowUp, faArrowDown)


/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

// 註冊三級連動元件為全局元件
// 第一個參數是組件名稱，第二個參數是組件對象
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

new Vue({
	el: '#app',
	render: h => h(App),
	// 配置全域事件總線
	beforeCreate() {
		Vue.prototype.$bus = this;
	},

	// 註冊路由外掛
	router, // 每個元件都會擁有 $router 和 $route 屬性
	// 註冊倉庫外掛
	store, // 每個元件都會擁有 $store 屬性
});
