作业:利用过渡动画transiton，封装一个抽屉的效果。



1:课堂注意
出现一些项目中的提问的问题：比如 OK    1
                         比如：NO    2

2：线上授课
上课的时候如果收到社区人员通知做核酸，和老师说一声！
有任何困难和老说说一声
微信群+添加老师微信+学习问题及时与老师沟通
每一天的上课视频，老师会上传百度网盘





3)复习一下
三级联动业务:
3.1前面基础课程当中v-for很少使用index，以后在写项目的时候，index索引值切记加上
3.2防抖与节流【面试经常出现】
3.3vuex可以模块式开发
vuex经常用的套路是state、mutations、actions、getters、modules



1)搜索模块中的三级联动与过渡动画


1.1在home模块当中，使用了一个功能三级联动功能---->[typeNav]
1.2在search模块当中，也使用三级联动的功能------->[typeNav]
1.3注意的事项
注意1：以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用
咱们经常把这类的组件注册为全局组件。
注册全局组件的好处是什么那：只需要注册一次，可以在程序任意地方使用

注意2:咱们经常把项目中共用的全局组件放置于components里面，以后需要注意，
项目当中全局组件（共用的组件）一般放置于components文件夹中

注意3：全局组件只需要注册一次，就可以在项目当中任意的地方使用，注册全局组件一般是在入口文件注册。



2)组件name属性的作用?
2.1开发者工具中可以看见组件的名字
2.2注册全局组件的时候，可以通过组件实例获取相应组件的名字




3)TypeNav组件业务分析?
3.1三级联动在home模块正常显示
3.2三级联动在search一会显示、一会隐藏 ---解决方案：通过一个响应式属性控制三级联动显示与隐藏
3.3开发的时候的出现问题：在home模块下不应该出现显示与隐藏的效果
3.4现在这个问题【三级联动：本身在search模块应该有显示与隐藏的业务】 ，但是在home模块下不应该出现显示与隐藏的业务
说白了：你需要让三级联动组件知道谁在用它。
3.5:通过$route让组件区分在那个模块下
以后在功的时候，如果出现某一个组件要区分当前在哪一个模块中【home、search】，通过$route路由信息区分
3.6路由跳转的时候，相应的组件会把重新销毁与创建----【kepp-alive】





4)过渡效果
最早接触的时候:CSS3
Vue当中也有过渡动画效果---transition内置组件完成
4.1:注意1,在Vue当中，你可以给 （某一个节点）|（某一个组件）添加过渡动画效果
但是需要注意，节点|组件务必出现v-if|v-show指令才可以使用。




5)TypeNav三级联动性能优化?
项目：home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
获取三级联动的数据进行展示。

项目中如果频繁的向服务器发请求，很好性能的，因此咱们需要进行优化。


5.1为什么会频繁的向服务器发请求获取三级联动的数据那?

因为路由跳转的时候，组件会进行销毁的【home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据】
只需要发一次请求，获取到三级联动的数据即可，不需要多次。
最终解决方案：在App.



5.2:项目性能优化手段有哪些？
v-if|v-show选择
按需加载          lodash、ant
防抖与节流
请求次数优化




6)开发listContainer|Floor组件业务？
接下来需要开发listContainer与floor组件
场景:开发项目，产品经理画出原型，前端与后端人员需要介入（开发项目），
leader（老大）刚开完会，前端与后端负责哪些模块，后端人员（....开发服务器），
前端人员【项目起步、开发静态页面、查分静态组件】，回首一看回台‘哥哥’，接口没有写好，
向这种情况，前端人员可以mock一些数据【前端程序员自己模拟的一些假的接口】，当中工作中项目上线，需要把mock
数据变为后台哥哥给的接口数据替换。


6.1mock数据。
注意：因为后台老师没有给我们写好其他接口【老师们特意的：因为就是想练习mock数据】
但是项目中mock数据，你就把他当中真实接口数据用就行。

注意：mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。
注意：mockjs【并非mock.js mock-js】
http://mockjs.com/  官方地址

mock官网一句话：晚上练习的时候，如果网速可以，看看mock的官网，看看语法规则；
生成随机数据，拦截 Ajax 请求
mock官网当中这句话的理解：
模拟的数据一般：对象、数组
{
    'a|1-10':'我爱你'
}
拦截ajax请求：请求发布出去【浏览器会进行拦截：笨想，因为服务器】，只是项目当中本地自己玩耍数据。


第一步:安装依赖包mockjs

第二部：在src文件夹下创建一个文件夹，文件夹mock文件夹。

第三步:准备模拟的数据
把mock数据需要的图片放置于public文件夹中！
比如:listContainer中的轮播图的数据
[
   {id:1,imgUrl:'xxxxxxxxx'}, 
   {id:2,imgUrl:'xxxxxxxxx'}, 
   {id:3,imgUrl:'xxxxxxxxx'}, 
]

第四步：在mock文件夹中创建一个server.js文件
注意：在server.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。
对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。


第五步:通过mock模块模拟出数据

通过Mock.mock方法进行模拟数据


第六步:回到入口文件，引入serve.js
mock需要的数据|相关mock代码页书写完毕，关于mock当中serve.js需要执行一次，
如果不执行，和你没有书写一样的。



第七步:在API文件夹中创建mockRequest【axios实例：baseURL:'/mock'】
专门获取模拟数据用的axios实例。

在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK




7）存储数据，存储于vuex
7.1:书写静态页面
7.2：拆分组件
7.3：获取服务器数据
7.4：展示数据
7.5：开发动态业务




8)swiper基本的使用？

8.1:swiper可以在移动端使用？还是PC端使用？
答：swiper移动端可以使用，pc端也可以使用。

8.2:swiper常用于哪些场景？
常用的场景即为轮播图----【carousel:轮播图】
swiper最新版本为7版本的，项目当中使用的是5版本

https://www.swiper.com.cn/ 官网地址



# 自己的筆記

## 導航列中商品分類的顯示和隱藏

+ 顯示和隱藏要想到: v-if, v-show

### 方案一: 使用 vue-router中的 meta

```js
export default new VueRouter({
	// 配置路由
	routes: [
		{
			path: '/home',
			meta: { isShowFooter: true, isShowTypeNav: true },
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
```

藉由判斷 ```this.$route.meta.isShowTypeNav``` 決定顯示或隱藏

```vue
<div
    class="sort"
    v-show="show">
    <!-- 利用事件的委派 + 編程式導航實現路由的跳轉與傳遞參數 -->
    <div
        class="all-sort-list2"
        @click="goSearch">
        <div
            class="item"
            v-for="(c1, index) in categoryList"
            :key="c1.categoryId"
            @mouseenter="changeCurIndex(index)"
            :class="{ cur: currentIndex === index }">
            <h3>
                <a
                    :data-category-name="c1.categoryName"
                    :data-category1-id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                >
            </h3>
            <div
                class="item-list clearfix"
                :style="{
                    display:
                        currentIndex === index
                            ? 'block'
                            : 'none',
                }">
                <div class="subitem">
                    // ...
                </div>
            </div>
        </div>
    </div>
</div>
```

### 方案二 使用data紀錄

+ 在data中加入 show屬性，默認值為 false

+ 在生命週期hook中藉由路由路徑判斷是否呈現三級連動選單

  ```js
  mounted() {
      // 通知vuex發起請求，獲取數據，存儲於倉庫中
      this.getCategoryList();
      
      if (this.$route.path === '/home') {
          this.show = true;
      }
  }
  ```

  

## 開發Search模組中TypeNav商品分類目錄的過度動畫

+ 過度動畫: (前提) 元素務必要有 v-if 或 v-show 指令才能進行過度動畫



## 對商品三級列表進行改善

+ 將獲取商品列表的派發移置 app.vue 根元件 中，app.vue是最先被加載的元件，且 mounted() 只會執行一次。

  ```js
  mounted() {
      // 通知vuex發起請求，獲取數據，存儲於倉庫中
      // 派發一個action，獲取商品分類的三級列表數據
      this.$store.dispatch('getCategoryList');
  }
  ```

  

## 合併參數

+ 路由中要可以同時傳遞 ```params``` 和 ```query```

  ```js
  goSearch() {
      const location = {
          name: 'search',
          params: {
              // 一定要有undefined，否則當傳遞的keyword為空字串會導致路由錯誤
              // /search/:keyword?... -> /?... 路由路徑中的search消失了
              keyword: this.keyword || undefined,
          },
      };
  
      // 若有query參數也需要攜帶
      if (this.$route.query) {
          location.query = this.$route.query;
      }
  
      this.$router.push(location);
  },
  ```



## 開發Home首頁中的 ListContainer 元件 和 Floor 元件

+ 需要了解一件事情: server端返回的數據 (api) 只有商品分類目錄的分類數據，對於 ListContainer元件和Floor元件 數據伺服器是沒有提供的。

### mock(模擬)數據技術

+ 安裝: mockjs
+ 使用步驟:
  1. 在項目中的src資料夾下創建mock資料夾
  2. 準備json數據，在mock資料夾下創建相應的json檔案 (切記: 檔案中不能留有空白字元)
  3. 將mock數據所需要的圖片放置到 public 資料夾下 (public 資料夾在打包時，會將相應的資源原封不動打包放到 dist 資料夾中)。
  4. 在mock資料夾下創建 ```mockServer.js``` ，開始mock (模擬數據)，通過 ```mockjs``` 函數庫實現。
  5. 將 ```mockServer.js``` 檔案在入口檔案中引入 (至少要先執行一次，才能模擬數據)。



## 輪播圖

+ 安裝: swiper ```npm i swiper@5```
+ 使用:
  1. 引入相應的依賴包 (swiper.js, swiper.css)
  2. 頁面當中必須要有相對應的結構
  3. 創建 ```Swiper``` 實例，使輪播圖擁有動態效果。```new Swiper(option)``` 之前結構一定要先有。



























































