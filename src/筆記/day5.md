------作业：
晚上翻看一下swiperAPI

项目第四天:重要的事情
1:mockjs模块实现模拟数据
---对于将来实际工作的时候，后台没有准备好接口（服务器没有开发出来），前端工程师可以利用mock技术，
实现模拟数据，将来项目上线（后台真实接口）写好了，替换为真实接口即可。
---对于咱们而言，后台老师确实没有给首页中轮播这部分的接口，mock数据，你可以当中一个真实接口就行了。
上线的时候，对于mock数据对于项目而言没有任何影响。

对于项目而言:真实的接口 /api/xxxx    模拟的数据/mock/xxxx
模拟数据JSON：没有空格，最好使用格式化插件进行格式化。


2:swiper插件。
提醒:当年学习过移动端视口、rem、高清图等等。
swiper插件：可以在移动端、PC端都可以使用，这个插件经常可以快速开发轮播图。
前端开发:轮播图、分页器、日历。


Swiper使用步骤：
第一步：引入依赖包【swiper.js|swiper.css】
第二步:静态页面中结构必须完整【container、wrap、slider】，类名不能瞎写
第三步:初始化swiper实例


*************************************************************************************


1:swiper在Vue项目中使用 （开发ListContainer组件【首页banner图片】）
提示：卸载插件，你可以不用删除node_modules文件夹，可以使用npm uninstall xxxx进行卸载
1.1swiper安装到项目当中

1.2在相应的组件引入swiper.js|swiper.css 

但是需要注意，home模块很多组件都使用到swiper.css,没必要在每一个组件内部都引入样式一次，
只需要在入口文件引入一次即可。

1.3:初始化swiper实例在哪里书写?
初始化swiper实例之前，页面中的节点（结构）务必要有，
对于Vue一个组件而言，mounted[组件挂载完毕：相应的结构不就有了吗]
mounted-->组件挂载完毕

1.4动态效果为什么没有出来？
Swiper需要获取到轮播图的节点DOM，才能给swiper轮播添加动态效果，
因为没有获取到节点。

1.5第一种解决方案，延迟器（不是完美的解决方案）
同学的想法：都不是完美的【错误的想法】
created里面：created执行与mounted执行，时间差可能2ms，白扯
updated里面：如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。

总结：第一种解决方案可以通过延迟器（异步）去解决问题，
但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定
延迟器时间。




2:Swiper在Vue项目中使用完美解决方案
第一种解决方案问题出现在哪里：v-for,在遍历来自于Vuex（数据:通过ajax向服务器发请求，存在异步）

watch:监听属性，watch可以检测到属性值的变化，当属性值发生变化的时候，可以出发一次。

Vuex当中的仓库数据bannerList（组件在使用）：
bannerList仓库数据有没有发生过变化？
一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】
组件实例在使用仓库中的bannerList，组件的这个属性bannerList一定是发生过变化，watch可以监听到。


组件实例的一个方法:$nextTick
this.$nextTick(()=>{

})
nextTick官网解释:
在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。
注意：组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方插件使用，获取更新后的DOM节点


总结:
1:Swiper插件工作的是很常用（今晚把API、基本使用方法）看看
2:组件实例的$nextTick方法。
在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM





3)开发Floor组件
开发Floor组件：Floor组件它被复用的（重复使用两次）

3.1:Floor组件获取mock数据，发请求的action书写在哪里?
派发action应该是在父组件的组件挂载完毕生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件
获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。


3.2:父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件


3.3v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用



3.4组件间通信******面试必问的东西
props:父子
插槽:父子
自定义事件:子父
全局事件总线$bus:万能
pubsub:万能
Vuex:万能
$ref:父子通信
3.5为什么在Floor组件的mounted中初始化SWiper实例轮播图可以使用.
因为父组件的mounted发请求获取Floor组件，当父组件的mounted执行的时候。
Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了
，因此v-for在遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。
否则，你都看不见Floor组件



4)carousel全局组件
如果项目当中出现类似的功能，且重复利用，封装为全局组件----【不封装也可以】

为了封装全局的轮播图组件:让Floor与listContainer组件中的代码一样，如果一样完全可以独立出来
封装为一个全局组件。




最终:今天项目当中那部分业务有问题（没明白的）  ----1

    项目业务逻辑OK的   -------------------------2





# 筆記

## 輪播圖非同步數據加載解決方案

+ watch + nextTick: 數據監聽 
+ $nextTick:
  + 在下次DOM更新 **循環結束之後(v-for)** 執行延遲回調，在 **數據修改之後** 立即使用這個方法，獲取更新後的DOM物件。
  + 可以保證頁面中的結構一定是有的，經常與其他第三方模組搭配使用 (需要操控的DOM已經生成)。

```js
watch: {
			// 監聽bannerList數據的變化
			bannerList: {
				// 通過watch監測bannerList屬性值的變化
				// 一旦數據發生變化，就會觸發handler函數
				// 若執行了handler函數，表示元件上的數據已經更新，從空陣列變成了有數據的陣列
				// handler方法執行時，只能保證bannerList數據已經有了，但無法保證 v-for 已經遍歷完成
				// v-for 遍歷完成時才會有完整結構
				handler(newVal, oldVal) {
					this.$nextTick(() => {
						// 當執行這個callback函數時，保證了數據已經收到，v-for執行完畢，輪播圖的結構已經完整
						const mySwiper = new Swiper(this.$refs.mySwiper, {
							loop: true, // 循环模式选项

							// 如果需要分页器
							pagination: {
								el: '.swiper-pagination',
								// 點擊小球切換圖片
								clickable: true,
							},

							// 如果需要前进后退按钮
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							},
						});
					});
				},
			},
		},
```



## 開發Floor元件

+ store中state的數據格式的初始值需要依據伺服器返回的類型決定

+ getFloorList 這個 action 在哪個地方被觸發?

  需要在Home路由元件中派發 ```getFloorList``` ，不能在 Floor 元件內部派發 action，因為需要 ```v-for``` 遍歷 Floor 元件。

  每個 ```Floor``` 元件所需的資訊是floorList陣列中的每個元素。

+ ```v-for``` 可以在自定義標籤當中使用
+ 元件間的通訊有哪些?
  + props: 用於父子通訊
  + 自定義事件: @on, @emit 可實現子給父通訊
  + 全局事件總線: $bus
  + ```pubsub-js```
  + 插槽(slot)
  + vuex

## 將輪播圖拆分為一個共用的全局元件

+ 開發時若看到某個元件在許多地方都有使用，將其抽取為全域元件。註冊一次，到處使用。共用的元件 || 非路由元件放到 components 資料夾中。



## 開發 Search 路由元件

+ 靜態頁面 + 靜態組件拆分出來
+ 發請求 API
+ vuex
+ 元件獲取 store中的數據，動態展示數據
+ 



























