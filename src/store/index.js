import Vue from 'vue';
import Vuex from 'vuex';

// 引入小倉庫
import home from './home';
import search from './search';

// 使用Vuex外掛
Vue.use(Vuex);

// 對外暴露一個store類別的物件
export default new Vuex.Store({
	// 實現Vuex倉庫模組化開發數據存儲
	modules: {
		home,
		search,
	},
});
