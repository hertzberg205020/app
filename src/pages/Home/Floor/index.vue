<template>
	<div class="floor">
		<div class="py-container">
			<div class="title clearfix">
				<h3 class="fl">{{ floorInfo.name }}</h3>
				<div class="fr">
					<ul class="nav-tabs clearfix">
						<li
							active-class="active"
							v-for="(item, index) in floorInfo.navList"
							:key="index">
							<a
								href="#tab1"
								data-toggle="tab"
								>{{ item.text }}</a
							>
						</li>

						<!--
						<li>
							<a
								href="#tab2"
								data-toggle="tab"
								>大家电</a
							>
						</li>
						<li>
							<a
								href="#tab3"
								data-toggle="tab"
								>生活电器</a
							>
						</li>
						<li>
							<a
								href="#tab4"
								data-toggle="tab"
								>厨房电器</a
							>
						</li>
						<li>
							<a
								href="#tab5"
								data-toggle="tab"
								>应季电器</a
							>
						</li>
						<li>
							<a
								href="#tab6"
								data-toggle="tab"
								>空气/净水</a
							>
						</li>
						<li>
							<a
								href="#tab7"
								data-toggle="tab"
								>高端电器</a
							>
						</li>
						-->
					</ul>
				</div>
			</div>
			<div class="tab-content">
				<div class="tab-pane">
					<div class="floor-1">
						<div class="blockgary">
							<ul class="jd-list">
								<li
									v-for="(
										keyword, index
									) in floorInfo.keywords"
									:key="index">
									{{ keyword }}
								</li>
								<!--
								<li>4K电视</li>
								<li>空气净化器</li>
								<li>IH电饭煲</li>
								<li>滚筒洗衣机</li>
								<li>电热水器</li>
								-->
							</ul>
							<img :src="floorInfo.imgUrl" />
						</div>
						<div class="floorBanner">
							<!-- 輪播圖 -->
							<Carousel :carouselList="floorInfo.carouselList" />
						</div>

						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<img :src="floorInfo.recommendList[0]" />
							</div>
							<div class="floor-conver-pit">
								<img :src="floorInfo.recommendList[1]" />
							</div>
						</div>
						<div class="split center">
							<img :src="floorInfo.bigImg" />
						</div>
						<div class="split">
							<span class="floor-x-line"></span>
							<div class="floor-conver-pit">
								<img :src="floorInfo.recommendList[2]" />
							</div>
							<div class="floor-conver-pit">
								<img :src="floorInfo.recommendList[3]" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import Swiper from 'swiper';
	export default {
		name: 'Floor',
		data() {
			return {};
		},
		props: ['floorInfo'],
		computed: {},
		methods: {},
		mounted() {
			// 首次使用輪播圖swiper時，無法在mounted中使用，但為什麼此處可以？
			// 首次使用時，後端數據資源的請求是由當前元件內部發起的，至少需要等待伺服器返回數據後
			// 頁面才能動態渲染出來，獲取完整的DOM結構，因此當時是不行的。
			// 現在為什麼可以? 因為請求是父元件派發的，父元件通過 props 傳遞數據，
			// 在結構完整的情況下執行mounted是沒問題的
			// const mySwiper = new Swiper(this.$refs.floor1Swiper, {
			// 	loop: true, // 循环模式选项
			// 	// 如果需要分页器
			// 	pagination: {
			// 		el: '.swiper-pagination',
			// 		// 點擊小球切換圖片
			// 		clickable: true,
			// 	},
			// 	// 如果需要前进后退按钮
			// 	navigation: {
			// 		nextEl: '.swiper-button-next',
			// 		prevEl: '.swiper-button-prev',
			// 	},
			// });
		},

		// watch: {
		// 	// 立即監聽: 不論數據有無變化，一上來就先執行一次
		// 	// 為何watch監聽不到floorInfo的變化？ 因為該數據從未發生過變化，
		// 	// 數據是由父元件通過 props 傳遞
		// 	floorInfo: {
		// 		immediate: true,

		// 		handler(newVal, oldVal) {
		// 			// 只能監聽到數據已經有了，但v-for動態渲染的結構還是無法確認是否已經渲染完成
		// 			// 因此需要使用nextTick
		// 			this.$nextTick(() => {
		// 				const mySwiper = new Swiper(this.$refs.floor1Swiper, {
		// 					loop: true, // 循环模式选项

		// 					// 如果需要分页器
		// 					pagination: {
		// 						el: '.swiper-pagination',
		// 						// 點擊小球切換圖片
		// 						clickable: true,
		// 					},

		// 					// 如果需要前进后退按钮
		// 					navigation: {
		// 						nextEl: '.swiper-button-next',
		// 						prevEl: '.swiper-button-prev',
		// 					},
		// 				});
		// 			});
		// 		},
		// 	},
		// },
	};
</script>

<style scoped lang="less">
	.floor {
		margin-top: 15px;

		.py-container {
			width: 1200px;
			margin: 0 auto;

			.title {
				.fl {
					float: left;
					color: #c81623;
					font-size: 20px;
					line-height: 30px;
					margin: 9px 0;
					font-weight: 700;
				}

				.fr {
					float: right;

					.nav-tabs {
						margin: 10px 0 0;
						display: inline-block;

						li {
							float: left;
							line-height: 18px;

							a {
								padding-top: 1px;
								font-weight: 400;
								background-color: #fff;

								&::after {
									content: '|';
									padding: 0 10px;
								}
							}

							&:nth-child(7) {
								a {
									&::after {
										content: '';
									}
								}
							}

							&.active {
								a {
									color: #e1251b;
								}
							}
						}
					}
				}
			}

			.tab-content {
				border-top: 2px solid #c81623;
				border-bottom: 1px solid #e4e4e4;

				.tab-pane {
					.floor-1 {
						height: 360px;
						display: flex;

						.blockgary {
							width: 210px;
							height: 100%;
							background: #f7f7f7;

							.jd-list {
								padding: 15px 0;
								overflow: hidden;

								li {
									list-style-type: none;
									float: left;
									width: 40%;
									margin: 0 10px;
									border-bottom: 1px solid #e4e4e4;
									text-align: center;
									line-height: 26px;
								}
							}

							img {
								width: 100%;
							}
						}

						.floorBanner {
							width: 330px;
							height: 100%;
						}

						.split {
							width: 220px;
							height: 100%;
							position: relative;

							.floor-x-line {
								position: absolute;
								background: #e4e4e4;
								width: 220px;
								height: 1px;
								top: 180px;
							}

							.floor-conver-pit {
								width: 100%;
								height: 50%;

								img {
									width: 100%;
									height: 100%;
									transition: all 400ms;

									&:hover {
										opacity: 0.8;
									}
								}
							}
						}

						.center {
							border: 1px solid #e4e4e4;
						}
					}
				}
			}
		}
	}
</style>
