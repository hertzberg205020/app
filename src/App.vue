<template>
	<div id="app">
		<Header></Header>
		<!-- 呈現路由元件 -->
		<router-view></router-view>
		<!-- 在Home和Search顯示，在Login和Register隱藏 -->
		<Footer v-show="$route.meta.isShowFooter"></Footer>
	</div>
</template>

<script>
	import Header from './components/Header';
	import Footer from './components/Footer';
	export default {
		name: 'App',
		components: {
			Header,
			Footer,
		},
		mounted() {
			// 通知vuex發起請求，獲取數據，存儲於倉庫中
			// 派發一個action，獲取商品分類的三級列表數據
			this.$store.dispatch('home/getCategoryList');
		},
	};
</script>

<style></style>
