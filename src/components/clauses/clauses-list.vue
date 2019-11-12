<template>
  <div class="clauses-list">
    <div class="table-header">
      <p class="title">歌曲列表</p>
      <p class="num">1首歌</p>
      <p class="playnum">播放:100次</p>
    </div>
    <table border="1px" border-spacing="0" border-collapse="0" cellpadding="none">
      <thead>
        <th class="opa"></th>
        <th>歌曲标题</th>
        <th>时长</th>
        <th>歌手</th>
        <th>专辑</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td text-align="center">5</td>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "clauses-list"
};
</script>

<style scoped lang="scss">
.clauses-list {
  background: #fff;
  .table-header {
    padding-left: 36px;
    padding-right: 5px;
    overflow: hidden;
    line-height: 30px;
    .title {
      font-size: 20px;
      color: #282828;
      float: left;
    }
    .num {
      font-size: 12px;
      color: #666666;
      padding-left: 22px;
      float: left;
    }
    .playnum {
        float: right;
    }
  }
  table {
    width: 100%;
    border-top: 3px solid #c20c0c;
    thead {
      th {
        background: #f0f0f0;
        border: 1px solid #cbcbcb;
        border-radius: 3px;
        box-shadow: 0 2px 4px #bbb;
        color: #666666;
        font-weight: normal;
        &:nth-of-type(1) {
          min-width: 75px;
        }
        &:nth-of-type(2) {
          width: 304px;
        }
      }
    }
    tr {
      td {
        border: 1px solid #bbb;
        color: #bbb;
      }
    }
  }
}
</style>