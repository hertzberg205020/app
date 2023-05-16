<template>
  <div class="pagination">
    <button>上一頁</button>
    <button>1</button>
    <button>···</button>

    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>6</button>
    <button>7</button>

    <button>···</button>
    <button>{{ pages }}</button>
    <button>下一頁</button>

    <button style="margin-left: 30px">共 {{ total }} 筆</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['total', 'pageSize', 'pageNo', 'continues'],
  computed: {
    // 總頁數
    pages() {
      const { total, pageSize } = this;
      // 無條件進位
      const pages = Math.ceil(total / pageSize);
      return pages;
    },
    // 計算出連續頁碼的起始與結束
    startAndEndNum() {
      const { continues, pages, pageNo } = this;
      let start, end;
      // 要連續呈現的頁碼數量是5，至少要有5頁
      // 總頁數小於要連續呈現的頁碼數量
      if (pages < continues) {
        start = 1;
        end = pages;
      } else {
        // 正常情況
        const bound = parseInt(continues / 2);
        start = pageNo - bound;
        end = pageNo + bound;
        // start: 不能是0 || 負數
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // end: 不能大於總頁數
        if (end > pages) {
          end = pages;
          start = pages - continues + 1;
        }
      }
      return { start, end };
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
