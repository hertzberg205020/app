<template>
	<div class="type-nav">
		<div class="container">
			<div
				@mouseleave="leaveShow"
				@mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<!-- 過度動畫 -->
				<transition name="sort">
					<!-- 三級連動目錄 -->
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
										<dl
											class="fore"
											v-for="c2 in c1.categoryChild"
											:key="c2.categoryId">
											<dt>
												<a
													:data-category-name="
														c2.categoryName
													"
													:data-category2-id="
														c2.categoryId
													"
													>{{ c2.categoryName }}</a
												>
											</dt>
											<dd>
												<em
													v-for="c3 in c2.categoryChild"
													:key="c3.categoryId">
													<a
														:data-category-name="
															c3.categoryName
														"
														:data-category3-id="
															c3.categoryId
														"
														>{{
															c3.categoryName
														}}</a
													>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	// 引入lowdash: 按需引入
	import throttle from 'lodash/throttle';

	export default {
		name: 'TypeNav',
		// 元件掛載完畢時，向伺服器發起請求
		methods: {
			...mapActions('home', ['getCategoryList']),

			/**
			 * @description: 滑鼠移入時，改變currentIndex的值
			 * @param {Number} index
			 * @return {undefined}
			 * throttle中的callback不要使用箭頭函數
			 */
			changeCurIndex: throttle(function (index) {
				this.currentIndex = index;
			}, 50),

			/**
			 * @description: 滑鼠移出時，將currentIndex的值設為-1
			 */
			leaveShow() {
				this.currentIndex = -1;

				// 若當前路由為首頁，則不進行隱藏
				if (this.$route.path === '/home') {
					return;
				}
				this.show = false;
			},

			/**
			 * @description: 滑鼠移入時，將show設為true
			 */
			enterShow() {
				this.show = true;
			},

			/**
			 * @description: 進行路由跳轉的方法
			 */
			goSearch(evt) {
				// 最好的解決方案: 編程式導航 + 事件委派
				// 事件委派會產生的問題:
				//   1. 點擊一定是 a 標籤?
				//      事件委派是將全部的子節點(h3, dt, dl, em, a)的事件都委派給父節點
				//      期望的是點擊 a標籤 才進行路由的跳轉。
				//   2. 如何獲取參數? (一、二、三目錄的產品名稱與ID)
				//      即使能確認點擊的是 a 標籤，如何區分是一、二、三分類的標籤。

				// 在a標籤上添加了data-categoryName屬性，其餘的子標籤沒有
				const element = evt.target;
				// 若獲取到發出事件的節點為a標籤，則一定會帶有data-categoryName屬性
				// 節點中的dataset屬性中存儲了所有的 'data-屬性' 的值
				let { categoryName, category1Id, category2Id, category3Id } =
					element.dataset;
				if (!categoryName) {
					return;
				}

				// 整理路由跳轉的參數
				let location = { name: 'search' };
				let query = { categoryName };

				const categoryIds = [category1Id, category2Id, category3Id];
				const categoryId = categoryIds.find(id => id !== undefined);

				if (categoryId) {
					const index = categoryIds.indexOf(categoryId);
					query[`category${index + 1}Id`] = categoryId;
				}

				// 整理完參數
				location.query = query;
				// 路由跳轉
				this.$router.push(location);
			},
		},
		data() {
			return {
				currentIndex: -1,
				show: false,
			};
		},
		computed: {
			...mapState({
				categoryList: state => state.home.categoryList,
			}),
		},
		mounted() {
			if (this.$route.path === '/home') {
				this.show = true;
			}
		},
	};
</script>

<style lang="less" scoped>
	.type-nav {
		border-bottom: 2px solid #e1251b;

		.container {
			width: 1200px;
			margin: 0 auto;
			display: flex;
			position: relative;

			.all {
				width: 210px;
				height: 45px;
				background-color: #e1251b;
				line-height: 45px;
				text-align: center;
				color: #fff;
				font-size: 14px;
				font-weight: bold;
			}

			.nav {
				a {
					height: 45px;
					margin: 0 22px;
					line-height: 45px;
					font-size: 16px;
					color: #333;
				}
			}

			.sort {
				position: absolute;
				left: 0;
				top: 45px;
				width: 210px;
				height: 461px;
				position: absolute;
				background: #fafafa;
				z-index: 999;

				.all-sort-list2 {
					.item {
						h3 {
							line-height: 30px;
							font-size: 14px;
							font-weight: 400;
							overflow: hidden;
							padding: 0 20px;
							margin: 0;

							a {
								color: #333;
							}
						}

						.item-list {
							display: none;
							position: absolute;
							width: 734px;
							min-height: 460px;
							background: #f7f7f7;
							left: 210px;
							border: 1px solid #ddd;
							top: 0;
							z-index: 9999 !important;

							.subitem {
								float: left;
								width: 650px;
								padding: 0 4px 0 8px;

								dl {
									border-top: 1px solid #eee;
									padding: 6px 0;
									overflow: hidden;
									zoom: 1;

									&.fore {
										border-top: 0;
									}

									dt {
										float: left;
										width: 54px;
										line-height: 22px;
										text-align: right;
										padding: 3px 6px 0 0;
										font-weight: 700;
									}

									dd {
										float: left;
										width: 415px;
										padding: 3px 0 0;
										overflow: hidden;

										em {
											float: left;
											height: 14px;
											line-height: 14px;
											padding: 0 8px;
											margin-top: 5px;
											border-left: 1px solid #ccc;
										}
									}
								}
							}
						}

						// &:hover {
						// 	.item-list {
						// 		display: block;
						// 	}
						// }
					}
					.cur {
						background-color: skyblue;
					}
				}
			}
			.sort-enter {
				height: 0px;
			}
			.sort-enter-to {
				height: 461px;
			}
			.sort-enter-active {
				transition: all 0.5s linear;
			}
		}
	}
</style>
