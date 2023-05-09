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

// 保存VueRouter原型物件上的push方法
const originalPush = VueRouter.prototype.push;

// 保存VueRouter原型物件上的push方法
const originalReplace = VueRouter.prototype.replace;

/**
 * 重寫VueRouter原型物件上的push方法
 * @param {object} location: 跳轉地址(傳遞那些參數)
 * @param {function} resolve: 成功的回調函數
 * @param {function} reject: 失敗的回調函數
 * @returns
 */
VueRouter.prototype.push = function (location, resolve, reject) {
	if (resolve && reject) {
		// 這裡的this指的是VueRouter的實例物件
		// call與apply的差別在於傳入參數的方式不同
		// call: 傳遞參數使用逗號分隔
		// apply: 傳遞參數使用陣列
		originalPush.call(this, location, resolve, reject);
	} else {
		return originalPush.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

/**
 * 重寫VueRouter原型物件上的replace方法
 * @param {object} location 跳轉路由的訊息
 * @param {function} resolve 成功的回調函數
 * @param {function} reject 失敗的回調函數
 * @returns undefined
 */
VueRouter.prototype.replace = function (location, resolve, reject) {
	if (resolve && reject) {
		originalReplace.call(this, location, resolve, reject);
	} else {
		return originalReplace.call(
			this,
			location,
			() => {},
			() => {}
		);
	}
};

export default new VueRouter({
	// 配置路由
	routes: [
		{
			path: '/home',
			meta: { isShowFooter: true },
			component: Home,
		},
		{
			path: '/search/:keyword',
			name: 'search',
			meta: {
				isShowFooter: true,
			},
			component: Search,
		},
		{ path: '/login', component: Login },
		{ path: '/register', component: Register },
		{ path: '/', redirect: '/home' },
	],
});
