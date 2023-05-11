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

// 獲取搜尋模組所需的數據: 路由: /api/list, 請求方式: post, 請求參數: 需要帶參數
/*
	{
		"category3Id": "61",
		"categoryName": "手机",
		"keyword": "小米",
		"order": "1:desc",
		"pageNo": 1,
		"pageSize": 10,
		"props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
		"trademark": "4:小米"
	}
*/

/**
 * 該函數需要接收外部參數
 * 當前這個函數，給伺服器傳遞一個默認參數，至少要是一個空物件
 * @param {Object} searchParams 搜尋模組所需的參數
 */
export const reqGetSearchInfo = (searchParams = {}) =>
	requests({
		url: '/list',
		method: 'post',
		data: searchParams,
	});
