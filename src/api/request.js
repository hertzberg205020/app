import axios from 'axios';
// 引入進度條插件
import nProgress from 'nprogress';
// 引入進度條樣式
import 'nprogress/nprogress.css';

// 1. 使用 axios 物件的實例方法create，創建 axios 實例
// 2. request 即為 axios，只不過經過配置
const requests = axios.create({
	// 配置物件
	baseURL: '/api', // 基礎路徑，發請求的時候，路徑中會夾帶api
	timeout: 5000, // 設計請求超時時間為5 sec
});

// 請求攔截器: 再請求發出去之前，請求攔截器可以檢測到，可以再請求發出去之前，做一些事情
requests.interceptors.request.use(config => {
	// 進度條開始
	nProgress.start();
	// config: 配置物件，物件中有一個屬性很重要，headers請求頭
	return config;
});

// 響應攔截器
requests.interceptors.response.use(
	rsp => {
		// 進度條結束
		nProgress.done();
		// 成功的callback function: 伺服器正常返回數據後，響應攔截器會檢測到，可以做一些事情
		return rsp.data;
	},
	err => {
		// 失敗的回調
		return Promise.reject(new Error('fail'));
	}
);

// 對外暴露
export default requests;
