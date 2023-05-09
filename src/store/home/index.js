// Home模組的小倉庫
import { reqCategoryList } from '@/api';

const state = {
	categoryList: [],
};
const getters = {};

const mutations = {
	GetCategoryList(state, val) {
		state.categoryList = val;
	},
};

const actions = {
	async getCategoryList(ctx, val) {
		let rsp = await reqCategoryList();
		ctx.commit('GetCategoryList', rsp.data);
	},
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
