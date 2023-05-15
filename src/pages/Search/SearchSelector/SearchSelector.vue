<template>
	<div class="clearfix selector">
		<div class="type-wrap logo">
			<div class="fl key brand">品牌</div>
			<div class="value logos">
				<ul class="logo-list">
					<li
						v-for="trademark in trademarkList"
						:key="trademark.tmId"
						@click="tradeMarkHandler(trademark)">
						{{ trademark.tmName }}
					</li>
				</ul>
			</div>
			<div class="ext">
				<a
					href="javascript:void(0);"
					class="sui-btn"
					>多选</a
				>
				<a href="javascript:void(0);">更多</a>
			</div>
		</div>
		<!-- 商品屬性 -->
		<div
			class="type-wrap"
			v-for="attr in attrsList"
			:key="attr.attrId">
			<!-- 商品的各式屬性名稱: 例如: 顏色 -->
			<div class="fl key">{{ attr.attrName }}</div>
			<div class="fl value">
				<ul class="type-list">
					<!-- 商品的各式屬性值: 例如: 黑、白、粉、金 -->
					<li
						v-for="(attrVal, index) in attr.attrValueList"
						:key="index"
						@click="attrInfoHandler(attr, attrVal)">
						<a>{{ attrVal }}</a>
					</li>
				</ul>
			</div>
			<div class="fl ext"></div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name: 'SearchSelector',
		computed: {
			...mapGetters('search', ['trademarkList', 'attrsList']),
		},
		methods: {
			tradeMarkHandler(trademark) {
				// 點擊品牌，向server發起請求，獲取相應的數據進行展示
				// 問題: 在哪邊發起請求? 父元件還是子元件?
				// 答案: 父元件
				// 因為父元件中的searchParams數據是傳遞給server的參數，子元件需要將被點擊的品牌資訊傳遞給父元件 -> 通過自定義事件
				this.$emit('trademarkInfo', trademark);
			},

			attrInfoHandler(attr, attrVal) {
				this.$emit('attrInfo', attr, attrVal);
			},
		},
	};
</script>

<style lang="less" scoped>
	.selector {
		border: 1px solid #ddd;
		margin-bottom: 5px;
		overflow: hidden;

		.logo {
			border-top: 0;
			margin: 0;
			position: relative;
			overflow: hidden;

			.key {
				padding-bottom: 87px !important;
			}
		}

		.type-wrap {
			margin: 0;
			position: relative;
			border-top: 1px solid #ddd;
			overflow: hidden;

			.key {
				width: 100px;
				background: #f1f1f1;
				line-height: 26px;
				text-align: right;
				padding: 10px 10px 0 15px;
				float: left;
			}

			.value {
				overflow: hidden;
				padding: 10px 0 0 15px;
				color: #333;
				margin-left: 120px;
				padding-right: 90px;

				.logo-list {
					li {
						float: left;
						border: 1px solid #e4e4e4;
						margin: -1px -1px 0 0;
						width: 105px;
						height: 52px;
						text-align: center;
						line-height: 52px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						font-weight: 700;
						color: #e1251b;
						font-style: italic;
						font-size: 14px;

						img {
							max-width: 100%;
							vertical-align: middle;
						}
					}
				}

				.type-list {
					li {
						float: left;
						display: block;
						margin-right: 30px;
						line-height: 26px;

						a {
							text-decoration: none;
							color: #666;
						}
					}
				}
			}

			.ext {
				position: absolute;
				top: 10px;
				right: 10px;

				.sui-btn {
					display: inline-block;
					padding: 2px 14px;
					box-sizing: border-box;
					margin-bottom: 0;
					font-size: 12px;
					line-height: 18px;
					text-align: center;
					vertical-align: middle;
					cursor: pointer;
					padding: 0 10px;
					background: #fff;
					border: 1px solid #d5d5d5;
				}

				a {
					color: #666;
				}
			}
		}
	}
</style>
