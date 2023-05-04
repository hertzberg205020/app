// 配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用路由插件(外掛)
Vue.use(VueRouter);

// 引入路由元件
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

export default new VueRouter({
	// 配置路由
	routes: [
		{ path: '/home', meta: { isShowFooter: true }, component: Home },
		{ path: '/search', meta: { isShowFooter: true }, component: Search },
		{ path: '/login', component: Login },
		{ path: '/register', component: Register },
		{ path: '/', redirect: '/home' },
	],
});
