<template>
	<div
		class="swiper-container"
		ref="cur">
		<div class="swiper-wrapper">
			<div
				class="swiper-slide"
				v-for="carousel in carouselList"
				:key="carousel.id">
				<img :src="carousel.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
	// 引入輪播圖插件
	import Swiper from 'swiper';
	export default {
		name: 'Carousel',
		props: ['carouselList'],
		watch: {
			carouselList: {
				immediate: true,
				handler(newVal, oldVal) {
					if (newVal.length === 0) return;
					// 只能監聽到數據已經有了，但v-for動態渲染的結構還是無法確認是否已經渲染完成
					// 因此需要使用nextTick
					this.$nextTick(() => {
						const swiper = new Swiper(this.$refs.cur, {
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
	};
</script>

<style></style>
