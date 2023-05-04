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
	};
</script>

<style></style>
