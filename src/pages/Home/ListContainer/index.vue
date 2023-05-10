<template>
	<div class="list-container">
		<div class="sortList clearfix">
			<div class="center">
				<!--banner轮播-->
				<div
					class="swiper-container"
					ref="mySwiper">
					<div class="swiper-wrapper">
						<div
							class="swiper-slide"
							v-for="carousel in bannerList"
							:key="carousel.id">
							<img :src="carousel.imgUrl" />
						</div>
						<!--
                        <div class="swiper-slide">
							<img src="./images/banner2.jpg" />
						</div>
						<div class="swiper-slide">
							<img src="./images/banner3.jpg" />
						</div>
						<div class="swiper-slide">
							<img src="./images/banner4.jpg" />
						</div>
                        -->
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>

					<!-- 如果需要导航按钮 -->
					<div class="swiper-button-prev"></div>
					<div class="swiper-button-next"></div>
				</div>
			</div>
			<div class="right">
				<div class="news">
					<h4>
						<em class="fl">尚品汇快报</em>
						<span class="fr tip">更多 ></span>
					</h4>
					<div class="clearix"></div>
					<ul class="news-list unstyled">
						<li>
							<span class="bold">[特惠]</span>备战开学季
							全民半价购数码
						</li>
						<li>
							<span class="bold">[公告]</span>备战开学季
							全民半价购数码
						</li>
						<li>
							<span class="bold">[特惠]</span>备战开学季
							全民半价购数码
						</li>
						<li>
							<span class="bold">[公告]</span>备战开学季
							全民半价购数码
						</li>
						<li>
							<span class="bold">[特惠]</span>备战开学季
							全民半价购数码
						</li>
					</ul>
				</div>
				<ul class="lifeservices">
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">话费</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">机票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">电影票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">游戏</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">彩票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">加油站</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">酒店</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">火车票</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">众筹</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">理财</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">礼品卡</span>
					</li>
					<li class="life-item">
						<i class="list-item"></i>
						<span class="service-intro">白条</span>
					</li>
				</ul>
				<div class="ads">
					<img src="./images/ad1.png" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	// 引入輪播圖插件
	import Swiper from 'swiper';

	export default {
		name: 'ListContainer',
		data() {
			return {
				mySwiper: null,
			};
		},
		methods: {
			...mapActions('home', ['getBannerList']),
		},
		computed: {
			...mapState('home', ['bannerList']),
		},
		mounted() {
			// 通過Vuex發起ajax請求，將數據存到store中
			this.getBannerList();
			// 在 new Swiper() 實例之前，頁面中必須要有輪播圖的結構
			// 因為dispatch當中涉及到了非同步操作，導致 v-for 遍歷時結構還未完整
		},
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
						this.mySwiper = new Swiper(this.$refs.mySwiper, {
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

<style scoped lang="less">
	.list-container {
		width: 1200px;
		margin: 0 auto;

		.sortList {
			height: 464px;
			padding-left: 210px;

			.center {
				box-sizing: border-box;
				width: 740px;
				height: 100%;
				padding: 5px;
				float: left;
			}

			.right {
				float: left;
				width: 250px;

				.news {
					border: 1px solid #e4e4e4;
					margin-top: 5px;

					h4 {
						border-bottom: 1px solid #e4e4e4;
						padding: 5px 10px;
						margin: 5px 5px 0;
						line-height: 22px;
						overflow: hidden;
						font-size: 14px;

						.fl {
							float: left;
						}

						.fr {
							float: right;
							font-size: 12px;
							font-weight: 400;
						}
					}

					.news-list {
						padding: 5px 15px;
						line-height: 26px;

						.bold {
							font-weight: 700;
						}
					}
				}

				.lifeservices {
					border-right: 1px solid #e4e4e4;
					overflow: hidden;
					display: flex;
					flex-wrap: wrap;

					.life-item {
						border-left: 1px solid #e4e4e4;
						border-bottom: 1px solid #e4e4e4;
						margin-right: -1px;
						height: 64px;
						text-align: center;
						position: relative;
						cursor: pointer;
						width: 25%;

						.list-item {
							background-image: url(./images/icons.png);
							width: 61px;
							height: 40px;
							display: block;
						}

						.service-intro {
							line-height: 22px;
							width: 60px;
							display: block;
						}

						&:nth-child(1) {
							.list-item {
								background-position: 0px -5px;
							}
						}

						&:nth-child(2) {
							.list-item {
								background-position: -62px -5px;
							}
						}

						&:nth-child(3) {
							.list-item {
								background-position: -126px -5px;
							}
						}

						&:nth-child(4) {
							.list-item {
								background-position: -190px -5px;
							}
						}

						&:nth-child(5) {
							.list-item {
								background-position: 0px -76px;
							}
						}

						&:nth-child(6) {
							.list-item {
								background-position: -62px -76px;
							}
						}

						&:nth-child(7) {
							.list-item {
								background-position: -126px -76px;
							}
						}

						&:nth-child(8) {
							.list-item {
								background-position: -190px -76px;
							}
						}

						&:nth-child(9) {
							.list-item {
								background-position: 0px -146px;
							}
						}

						&:nth-child(10) {
							.list-item {
								background-position: -62px -146px;
							}
						}

						&:nth-child(11) {
							.list-item {
								background-position: -126px -146px;
							}
						}

						&:nth-child(12) {
							.list-item {
								background-position: -190px -146px;
							}
						}
					}
				}

				.ads {
					margin-top: 5px;

					img {
						opacity: 0.8;
						transition: all 400ms;

						&:hover {
							opacity: 1;
						}
					}
				}
			}
		}
	}
</style>
