1)要求
1.1：每一天老师书写代码务必三遍
1.2:node + webpack + VScode + 谷歌浏览器 + git
1.3:数组的方法 + promise + await + async + 模块化........

2)脚手架使用
2: vue init webpack 项目的名字
3|4：vue create 项目名称
脚手架目录:public + assets文件夹区别
node_modules:放置项目依赖的地方
public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
src：程序员源代码文件夹
  -----assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
  -----components文件夹:一般放置非路由组件（或者项目共用的组件）
        App.vue 唯一的根组件
        main.js 入口文件【程序最先执行的文件】
        babel.config.js:babel配置文件
        package.json：看到项目描述、项目依赖、项目运行指令
        README.md:项目说明文件


3)脚手架下载下来的项目稍微配置一下
3.1:浏览器自动打开
        在package.json文件中
        "scripts": {
         "serve": "vue-cli-service serve --open",
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },



3.2关闭eslint校验工具
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}
3.3 src文件夹的别名的设置
因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
创建jsconfig.json文件
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}


4:项目上传GIT
微信小程序实战课的时候，会带着大家玩耍的
注意:前面基础课程当中，创建分支、处理冲突等等
https://gitee.com/jch1011/shangpinhui_0607.git






5）路由的配置
vue-router
路由分为KV

node平台（并非语言）
对于后台而言:K即为URL地址   V即为相应的中间件
http://localhost:8080/0607
app.get("/0607",(res,req)=>{
   res.send('我是祖国的老花骨朵');
});


前端路由:
K即为URL（网络资源定位符）
V即为相应的路由组件


5.1路由的一个分析
确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）

5.2安装路由
 ```cnpm install --save vue-router ```

 ```npm i vue-router@3```

--save:可以让你安装的依赖，在package.json文件当中进行记录
5.3创建路由组件【一般放在views|pages文件夹】
5.4配置路由，配置完四个路由组件



4. 完成分路由元件 Header 和 Footer
   + 分析靜態頁面(html + css)
   + 拆分元件
   + 獲取server的數據動態展示
   + 完成相應的動態業務邏輯

​	注意1: 創建元件的時候，元件結構、元件樣式、靜態資源

​	注意2: 本專案採用less預處理樣式，瀏覽器無法識別 less 樣式，須通過 less, less-loader進行處理

​	```npm i less less-loader@7 --save-dev```



5. 路由元件的搭建

    5.1 vue-router 

    ​    在上面分析的時候，路由組件應該要有4個: Home, Search, Login, Register

    +	pages | views 資料夾: 放置路由元件
    +	components 資料夾: 放置非路由原件 (共用全局元件)

    5.2 配置路由

    ​	項目當中配置的路由一般放置在 **router** 資料夾中

    5.3 小結

    ​	路由元件和非路由元件的別:

    + 路由元件通常放置於pages | views 資料夾中，非路由元件通常放置在 components 資料夾中
     + 路由元件通常需要在 router 資料夾中進行註冊 (使用的即為組件名稱)
     + 非路由元件在使用時，一般以標籤的形式使用
     + 使用 vue-router 外掛，不論是 路由元件 還是 非路由元件 身上都有 $route, $router 屬性

​	

​	$route: 用以獲取路由資訊(路徑, query, params...)

​	$router: 一般進行編程式路由跳轉 (push | replace)

​	

​	5.4 路由的跳轉
​	路由的跳轉有2種形式: 

+ 宣告式導航 router-link
+ 編程式導航 push | replace

   編程式導航: 宣告式能夠達成的效果，編程式都能夠達成。但編程式導航除了可以進行路由跳轉，還可以執行一些其他的業務邏輯，例如: 登入時的生份驗證



6 Footer元件的顯示與隱藏

顯示/隱藏: v-if, v-show

在Home, Search顯示

在Login, Register隱藏



6.1 可以依據元件身上的 $route 獲取當前的路由資訊，通過路由訊息判斷顯示或隱藏

6.2 配置路由時，可以添加路由元屬性 (meta)，路由需要配置物件，key值需要遵照規範







6)创建非路由组件（2个：Header、Footer）

非路由组件使用分为几步:
第一步：定义
第二步：引入
第三步：注册
第四步:使用

非路由组件的结构的搭建：
前台项目的结构与样式不需要自己写的，老师准备好了
辉洪老师静态页面：
结构 + 样式 +图片资源

项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

1：安装less less-loader@7
切记less-loader安装7版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义
```npm i less less-loader@7 --save-dev```

2:需要在style标签的身上加上lang="less",不添加样式不生效






7)路由的跳转
路由的跳转就两种形式：声明式导航（router-link：务必要有to属性）
                    编程式导航push||replace
编程式导航更好用：因为可以书写自己的业务逻辑





面试题：v-show与v-if区别?
v-show:通过样式display控制
v-if：通过元素上树与下树进行操作
面试题:开发项目的时候，优化手段有哪些?
1:v-show|v-if
2:按需加载
8)首页|搜索底部是有Footer组件，而登录注册是没有Footer组件
Footer组件显示|隐藏，选择v-show|v-if
路由元信息



9）路由传参
params参数：路由需要占位，程序就崩了，属于URL当中一部分
query参数：路由不需要占位，写法类似于ajax当中query参数
路由传递参数先关面试题
     1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
     不可以：不能这样书写，程序会崩掉
     2:如何指定params参数可传可不传? 
     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
     4:如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
     5: 路由组件能不能传递props数据?



## 路由傳參

### 路由跳轉有幾種方式

+  宣告式: router-link (務必要有 to 屬性)
+ 編程式: 利用元件實例的 $router.push | replace 方法



### 路由傳參的方式

+ params參數: 相當於path中的一部分，須注意，在配置路由時需要佔位
+ query參數: 不屬於路由中的一部分，類似ajax中的queryString，ex: /home?key1=val1&key2=val2

```js
this.$router.push({
    name: 'search',
    params: {keyword: this.keyword},
    query: {k: this.keyword.toUpperCase()},
});
```



需要在router資料夾中的index.js 配置

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

import Search from '@/pages/Search';
import Home from '@/pages/Home';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{name: 'search',
              path: '/search/:keyword',  // 要使用佔位符作為路由參數要填入的位置ㄌ
              component: Search,
              meta: {isShowFooter: true}},
            {
                path: '/home',
                meta: { isShowFooter: true },
                component: Home
            },],
});
```



+ 使用路由傳遞參數(物件寫法)，物件的寫法可以是以name 或者 path 形式 (二擇一)。但須注意，path這種寫法不能與params參數一起使用。

+ 如何指定params參數可以不用傳值?

  若路由要求要傳遞params參數，而沒有傳遞params參數，會導致URI出現問題。

  在配置路由參數時，在路由參數後面加上 **?** ，表示該項路由參數為可選項。

+ 當params參數設置為可選項，遇到傳遞 空字串 ，如何解決?

  route.js中

  ```js
  export default new VueRouter({
  	// 配置路由
  	routes: [
  		{
  			path: '/search/:keyword?',  // keyword為可選
  			name: 'search',
  			meta: {
  				isShowFooter: true,
  			},
  			component: Search,
  		},
          // ...
  	],
  });
  ```

  

  

  不處理的話URI會不正確

  ```js
  this.$router.push({
      name: 'search',
      // 重要: :keyword 必須要是可選，undefined才會有效
      params: {keyword = '' || undefined},  // 這裡是重點
      query: {k = this.keyword.toUpperCase()},
  });
  ```

+ 路由元件能不能傳遞 props 數據?

  1. boolean寫法

     ```js
     const router = new VueRouter({
         routes: [{name: 'search',
                   path: '/search/:keyword',
                   component: Search,
                   meta: {isShowFooter: true},
                   props: true,  // 只適用 params 參數傳值
                  },
                 ],
     });
     ```

     在路由元件中

     ```js
     {
         name: 'Search',
         props: ['keyword']
     }
     ```

  2. 物件寫法

     ```js
     const router = new VueRouter({
         routes: [{name: 'search',
                   path: '/search/:keyword',
                   component: Search,
                   meta: {isShowFooter: true},
                   props: {a: '1', b: 2},
                  },
                 ],
     });
     ```

  3. 函數寫法

     ```js
     const router = new VueRouter({
         routes: [{name: 'search',
                   path: '/search/:keyword',
                   component: Search,
                   meta: {isShowFooter: true},
                   props: $route => ({
                       keyword: $route.params.keyword,
                       k: $route.query.k,
                   }),
                  },
                 ],
     });
     ```

     

​		
















​     
​    

