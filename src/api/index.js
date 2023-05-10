// 該模組進行: 進行api的統一管理
import requests from './request';
import mockRequests from './mockAjax';

// 三級連動的介面
// 請求路由: /api/product/getBaseCategoryList, 請求方式: get, 請求參數: 無
// 發請求: axios請求返回結果為promise物件
export const reqCategoryList = () =>
	requests({
		url: '/product/getBaseCategoryList',
		method: 'get',
	});

export const reqGetBannerList = () => mockRequests.get('/banner');

export const reqGetFloorList = () => mockRequests.get('/floor');
