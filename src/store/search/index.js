// Search模組的小倉庫
import { reqGetSearchInfo } from '@/api';

const state = {
	searchInfo: {},
};

// 計算屬性: 為了簡化倉庫中數據的獲取方式，
// 可以把將來要在元件中需要使用的數據簡化一下獲取方式
// 將來在元件中獲取數據就很方便
const getters = {
	// 參數中的state就是當前模組的state，並非大倉庫的state
	goodList(state) {
		// 假如伺服器掛掉，或是網路不穩定，會導致state.searchInfo為undefined
		return state.searchInfo.goodsList || [];
	},
	trademarkList(state) {
		return state.searchInfo.trademarkList || [];
	},
	attrsList(state) {
		return state.searchInfo.attrsList || [];
	},
};
const mutations = {
	GET_SEARCH_INFO(state, searchInfo) {
		state.searchInfo = searchInfo;
	},
};
const actions = {
	async getSearchInfo(ctx, params = {}) {
		// 該函數在發出請求時，至少傳遞一個空物件
		// params參數: 當使用者派發action時，透過第二個參數傳遞
		const rsp = await reqGetSearchInfo(params);
		if (rsp.code === 200) {
			return ctx.commit('GET_SEARCH_INFO', rsp.data);
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
