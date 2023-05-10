// Home模組的小倉庫
import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api';

const state = {
	// 倉庫中存儲的三級分類列表
	categoryList: [],
	// 倉庫中存儲的輪播圖列表
	bannerList: [],
	// 倉庫中存儲的floor列表
	floorList: [],
};
const getters = {};

// mutations是唯一修改state的地方
const mutations = {
	GET_CATEGORY_LIST(state, val) {
		state.categoryList = val;
	},
	GET_BANNER_LIST(state, val) {
		state.bannerList = val;
	},
	GET_FLOOR_LIST(state, val) {
		state.floorList = val;
	},
};

// 派發actions中的函數，可書寫非同步、複雜的邏輯
const actions = {
	async getCategoryList(ctx, val) {
		let rsp = await reqCategoryList();
		ctx.commit('GET_CATEGORY_LIST', rsp.data);
	},

	/**
	 * 獲取首頁輪播圖的列表數據
	 * @param {object} ctx
	 * @param {object} val
	 */
	async getBannerList(ctx, val) {
		let rsp = await reqGetBannerList();
		if (rsp.code === 200) {
			ctx.commit('GET_BANNER_LIST', rsp.data);
		}
	},

	async getFloorList(ctx, val) {
		const rsp = await reqGetFloorList();
		if (rsp.code === 200) {
			ctx.commit('GET_FLOOR_LIST', rsp.data);
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
