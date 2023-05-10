// 引入 mockjs 模組
import Mock from 'mockjs';
// 將JSON數據格式引入 [JSON數據格式根本沒有對外暴露，但為什麼可以引入??]
// webpack默認對外暴露: 圖片、字體、JSON數據格式
import banner from './banner.json';
import floor from './floor.json';

// mock數據: 第一個參數是請求地址 第二個參數是數據
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });
