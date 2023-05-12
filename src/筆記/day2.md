犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；



2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件








3)axios二次封装
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理
2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的



4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:



# Note

1. 編程式路由跳轉到當前路由(參數不變)，多次執行會拋出 NavigationDuplicated 警告錯誤
  + 路由跳轉: 編程式、宣告式

  + 宣告式導航不會出現這類問題，因為底層已經處理好了

  + 編程式導航進行路由跳轉為什麼會產生該錯誤呢?

    "vue-router": "^3.5.3": vue-router 引入 promise

    通過給 push 方法傳遞相應的成功與失敗 回調函數，可以捕獲當前錯誤，可以解決。

    ```js
    this.$router.push({name: 'search',
                       params: {keyword: this.keyword},
                       query: {k: this.keyword},},
                      resolve,
                      reject);
    ```

    這種寫法: 治標不治本，將來在其他的元件中 push | replace，編程式導航還是會發生類似的錯誤。


+ 分析元件

  this: 當前的VueComponent 的 instance (search)

  this.$router 屬性: 該屬性的屬性值是一個 VueRouter類 的一個 instance，在使用路由插件(外掛)時，會給元件 instance添加 $router, $route屬性。

  push: VueRouter函數顯示原型上的成員方法。

  ```js
  VueRouter.prototype.push = function() {
      // ...
      // this為VueRouter instance
  };
  
  let $router = new VueRouter();
  $router.push();
  
  ```

  對VueRouter原型物件上的push方法進行修改，修改的結果就會作用於元件實例中的 $router屬性。

  可以在router資料夾下的index.js中，重寫VueRouter的原型物件中的push方法。

  ```js
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
  ```

  

  2. 三級連動元件完成

     由於三級連動功能元件，需要在Home, Search, Detail 元件實例中使用，所以要可將三級連動註冊為全局元件。

     + 優點: 只需要註冊一次，就可在項目任意地方使用。



# 自己的筆記

## axios二次封裝

### 請求攔截器、響應攔截器

+ 請求攔截器: 可以在發請求之前處理一些業務
+ 響應攔截器: 當server返回數據後，可以處理一些事情

### 項目當中經常有 api 資料夾

+ 封裝axios

+ 後端提供的 api: 路由路徑中都包含 /api/...

+ ```js
  import axios from 'axios';
  
  // 1. 使用 axios 物件的實例方法create，創建 axios 實例
  // 2. request 即為 axios，只不過經過配置
  const requests = axios.create({
  	// 配置物件
  	baseURL: '/api', // 基礎路徑，發請求的時候，路徑中會夾帶api
  	timeout: 5000, // 設計請求超時時間為5 sec
  });
  
  // 請求攔截器: 再請求發出去之前，請求攔截器可以檢測到，可以再請求發出去之前，做一些事情
  requests.interceptors.request.use(config => {
  	// config: 配置物件，物件中有一個屬性很重要，headers請求頭
  	return config;
  });
  
  // 響應攔截器
  requests.interceptors.response.use(
  	rsp => {
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
  
  ```

  ### 介面的統一管理

  + 小項目: 可以在生命週期函數中發處請求
  + 大項目: 統一管理請求

  #### 跨域問題

  通訊協議、域名、port

  + 前端項目: ```http:///localhost:8080/#/home```   --- 本機伺服器
  + ```http://gmall-h5-api.atguigu.cn```   --- 尚硅谷提供的後端伺服器



## Vuex狀態管理庫

### Vuex是什麼?

Vuex是官方推出的一個外掛(插件)，狀態管理庫，集中式管理項目中元件共用的數據。

切記: 並不是全部的項目都需要Vuex的管理，若項目很小，完全不需要Vuex。若項目很大，元件數量很多，數據很多，數據維護很困難，才要使用。

+ vue2: 要使用 vuex3版本。
  + ```nmp i vuex@3```
+ vue3: 要使用 vuex4版本。
  + ```npm i vuex@4```

### vuex基本使用

根目錄新建 store 資料夾

```js
import Vue from 'vue';
import Vuex from 'vuex';

// 使用Vuex外掛
Vue.use(Vuex);

// state: 儲存數據的地方
const state = {
    count: 1,
};

// mutations: 修改state數據的唯一方式
const mutations = {
    ADD(state, val) {
        // ...
        state.count = val;
    },
};

// actions: 書寫業務邏輯，異步操作
const actions = {
    add(ctx, val) {
        // ...
        ctx.commit('ADD', val);
    }
};

// getters: 可以理解為計算屬性，讓元件獲取state的數據更加方便
const getters = {};

// 對外暴露一個store類別的物件
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
});
```



### Vuex 模組化

+ 若項目過大，元件數量過多，介面很多，數據很多，可以讓Vuex實現模組化開發。

+ 將大倉庫拆分成小倉庫

  ```bash
  	├── node_modules 
  	├── public
  	│   ├── favicon.ico: 页签图标
  	│   └── index.html: 主页面
  	├── src
  	│   │── component: 存放组件
  	│   │   ├── HelloWorld.vue
  	│   │── store: 倉庫
  	│   │   ├── home
  	│   │   │   └── index.js
      │   │   ├── search
      │   │   │   └── index.js
      │   │   ├── index.js
  
  ```

  + 小倉庫

  ```js
  // Home模組的小倉庫
  const state = {};
  const getters = {};
  const mutations = {};
  const actions = {};
  
  export default {
  	state,
  	getters,
  	mutations,
  	actions,
  };
  ```

  + 彙總

  ```js
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
  



### 完成三級連動展示數據

目錄的數據

```js
[{
    id: '001',
    name: 'foo',
    child: [
        {
            id: '037',
            name: 'subItem',
        },
        {},
    ],
}, {}]
```



### 使用JS達成css中 hover效果

```vue
<div
    class="item"
    v-for="(c1, index) in categoryList"
    :key="c1.categoryId"
    @mouseenter="changeCurIndex(index)"
    :class="{ cur: currentIndex === index }">
        // ...
</div>
```



### 透過js達成二、三級目錄的顯示與隱藏

```vue
<div
    class="item-list clearfix"
    :style="{
        display:
            currentIndex === index
                ? 'block'
                : 'none',
    }">
    // ...
</div>
```



### 函數防抖(Debounce) 與 函數節流(Throttle)

+ 節流: 在規定的時間範圍內不會重複觸發回調函數，只有大於指定的間隔時間才會觸發回調，將頻繁觸發變為少量觸發。

+ 防抖: 前面的所有觸發都被取消，最後一次將要被執行的回調函數會在**規定的時間**之後才會觸發。也就是若連續快速的觸發，回調函數只會執行最後**一次**。

+ 使用 **Lodash** 庫

  + 防抖

  ```js
  let input = document.querySelector('input');
  
  // 文字輸入框發生變化會立即執行callback
  // input.oninput = function() {
      // console.log('發送ajax');
  // };
  
  // 要引入Lodash函數庫
  input.oninput = _.debounce(() => {
      console.log('發送ajax');
  }, 1000);
  ```

  + 節流

  ```js
  let span = document.querySelector('span');
  let btn = document.querySelector('button');
  let count = 0;
  
  button.onclick = _.throttle(() => {
      // 節流: 在2秒內只執行一次callback
      // 假設這裡有很多的業務邏輯，可以給瀏覽器充裕的時間去解析
      count++;
      span.textContent = count;
      
  }, 2000);
  
  // 防抖: 使用者操作很頻繁，但是只會執行一次
  // 節流: 使用者操作很頻繁，但是將頻繁的操作變為少量的操作，給瀏覽器充裕的時間解析程式
  
  ```

  









