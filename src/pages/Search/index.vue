<template>
  <div>
    <!-- 商品分類三級列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 麵包屑 -->
          <ul class="fl sui-tag">
            <!-- 分類的麵包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 關鍵字的麵包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的麵包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ trademarkName }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 展示篩選商品的屬性值 -->
            <li
              class="with-x"
              v-for="(prop, index) in searchParams.props"
              :key="index"
            >
              {{ prop | showPropName }}
              <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序方式 -->
              <ul class="sui-nav">
                <li
                  :class="{ active: isOrderByIntegration }"
                  @click="changeOrderStatus('1')"
                >
                  <a>
                    综合
                    <font-awesome-icon
                      v-show="isOrderByIntegration"
                      :icon="displayIconStyle"
                    />
                    <!-- <span>⬆</span> -->
                  </a>
                </li>
                <li
                  :class="{ active: isOrderByPrice }"
                  @click="changeOrderStatus('2')"
                >
                  <a>
                    价格
                    <font-awesome-icon
                      v-show="isOrderByPrice"
                      :icon="displayIconStyle"
                    />
                    <!-- <span v-show="isOrderByPrice">⬆</span> -->
                  </a>
                </li>
                <!-- <li>
						<a>价格⬇</a>
					</li> -->
              </ul>
            </div>
          </div>
          <!-- 產品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <!--
												&ensp; 半形空格
												&emsp; 全形空格
												&thinsp; 窄空格
											-->
                      <em>¥&ensp;</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分頁器 -->
          <!-- 測試階段: 先使用假數據替換 -->
          <Pagination :pageNo="1" :pageSize="3" :total="91" :continues="5" />
          <!-- <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector';
import { mapGetters } from 'vuex';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Search',
  data() {
    return {
      // 傳給伺服器 api的參數
      searchParams: {
        // 一級分類的id
        category1Id: '',
        category2Id: '',
        category3Id: '',
        // 分類名稱
        categoryName: '',
        // 查詢關鍵字
        keyword: '',
        // 排序方式
        order: '2:asc',
        // 表示當前頁數
        pageNo: 1,
        // 表示每頁顯示的筆數
        pageSize: 10,
        // 銷售屬性參數
        props: [],
        // 品牌
        trademark: ''
      },
      iconStyle: ['fas', 'arrow-up', 'arrow-down']
    };
  },

  components: {
    SearchSelector
  },
  // 在元件畫面掛載完畢之前執行一次 (在mounted之前執行)
  beforeMount() {
    // 在發請求之前，將伺服器 api 所需要的參數整理好
    // this.searchParams = { ...this.searchParams, ...this.$route.query };
    // this.searchParams.keyword = this.$route.params.keyword;

    // 合併物件屬性
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在發請求之前，將初始數據調整為要傳給伺服器的數據
    this.getSearchInfo();
  },
  computed: {
    ...mapGetters('search', ['goodList']),
    trademarkName() {
      return this.searchParams.trademark.split(':')[1];
    },
    isOrderByPrice() {
      return this.searchParams.order.indexOf('2') !== -1;
    },
    isOrderByIntegration() {
      return this.searchParams.order.indexOf('1') !== -1;
    },
    displayIconStyle() {
      if (this.searchParams.order.indexOf('asc') !== -1) {
        return this.iconStyle.filter(e => e !== 'arrow-down');
      }
      return this.iconStyle.filter(e => e !== 'arrow-up');
    }
  },
  methods: {
    getSearchInfo() {
      this.$store.dispatch('search/getSearchInfo', this.searchParams);
    },

    /**
     * 將searchParams中的category相關的訊息清空
     * 再向伺服器發送請求
     * @description: 移除面包屑
     * @target: 面包屑
     */
    removeCategoryName() {
      // 修改路由: 進行路由跳轉
      // ajax傳遞參數時，若參數為undefined，則不會傳遞該參數，節省傳輸流量
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      this.$router.push({
        name: 'search',
        params: {
          keyword: this.searchParams.keyword || undefined
        }
      });

      // 當路由發生變化時，因為有設置監視屬性，所以會再次向伺服器發送請求
      // this.getSearchInfo();
    },

    removeKeyword() {
      // 將要傳遞給伺服器的參數中的keyword清空
      this.searchParams.keyword = undefined;

      // header 元件中的搜索框也要清空
      this.$bus.$emit('clearKeyword');

      // 修改路由: 進行路由跳轉
      const location = {
        name: 'search'
      };

      if (this.$router.query.categoryName) {
        location.query = this.$router.query;
      }
      // 當路由發生變化時，因為有設置監視屬性，所以會再次向伺服器發送請求
      this.$router.push(location);
      // ajax傳遞參數時，若參數為undefined，則不會傳遞該參數，節省傳輸流量
    },

    /**
     * @description: 自定義trademarkInfo事件的回調函數
     * @param {Object} trademark 品牌資訊
     */
    trademarkInfo(trademark) {
      // 整理要發送給伺服器的參數
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 發出請求，獲取數據進行展示
      this.getSearchInfo();
    },

    /**
     * @description: 移除品牌面包屑
     */
    removeTrademark() {
      // 將要傳遞給伺服器的參數中的trademark資訊置空
      this.searchParams.trademark = undefined;
      this.getSearchInfo();
    },

    /**
     * @description: 收集商品屬性資訊的回調函數
     * @param {Object} attr 商品屬性資訊
     * @param {String} attrVal 商品屬性值
     */
    attrInfo(attr, attrVal) {
      // ["属性ID:属性值:属性名"]
      const prop = `${attr.attrId}:${attrVal}:${attr.attrName}`;
      // 整理參數
      if (this.searchParams.props.includes(prop)) {
        return;
      }
      this.searchParams.props.push(prop);
      // 再次向伺服器發送請求
      this.getSearchInfo();
    },

    /**
     * @description: 移除商品屬性面包屑
     * @param {Number} index 要移除的屬性在searchParams.props中的索引
     */
    removeProp(index) {
      // 整理傳送數據
      this.searchParams.props.splice(index, 1);
      // 發出請求
      this.getSearchInfo();
    },

    /**
     * @type {String} type 排序方式，使用者點擊li標籤，用於區分是綜合(1), 還是價格(2)
     * @description: 改變商品排序方式
     */
    changeOrderStatus(type) {
      const originType = this.searchParams.order.split(':')[0];
      const originSort = this.searchParams.order.split(':')[1];
      let curSort = 'desc';
      // 判斷是否變更排序種類
      if (originType === type) {
        // 升序或降序
        curSort = originSort === 'asc' ? 'desc' : 'asc';
      }
      this.searchParams.order = `${type}:${curSort}`;

      // 發送請求
      this.getSearchInfo();
    }
  },
  // 監聽元件實例身上的屬性值變化
  watch: {
    // 監聽路由路徑是否發生變化，若發生變化，再次向伺服器送請求
    $route(newVal) {
      // 再次發出請求之前，整理要傳給伺服器的參數
      Object.assign(this.searchParams, newVal.query, newVal.params);
      // 發送ajax請求
      this.getSearchInfo();
      // 每次請求完畢，都要將一級、二級、三級分類的id清空，讓其不會影響下一次請求
      // categoryName, keyword 都會被新的值給置換掉
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    }
  },
  filters: {
    showPropName(prop) {
      return prop.split(':')[1];
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
