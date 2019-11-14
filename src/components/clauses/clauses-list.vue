<template>
  <div class="clauses-list">
    <div class="table-header">
      <p class="title">{{title}}</p>
      <p class="num">{{tableItemList.length}}首歌</p>
      <p class="playnum">播放:<span>{{playlist.playCount}}</span>次</p>
    </div>
    <table border="1px">
      <thead>
        <th class="opa"></th>
        <th v-for="item in tableHeadList"  :key="item">{{item}}</th>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
import TimeHandle from "../../utils/TimeHandle";

export default {
  name: "clauses-list",
  components: {},
  computed: {},
  props: {
    tableHeadList: {
      type: Array,
      default() {
        return ["歌曲标题", "时长", "歌手", "专辑"];
      }
    },
    tableItemList: {
      type: Array,
      default() {
        return [];
      }
    },
    title:{
      type:String,
      default:'歌曲列表'
    },
    playlist:{
      type:Object,
      default(){
        return {};
      }
    }
  }
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
      span{
        color: #c20c0c;
      }
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-top: 3px solid #c20c0c;
    table-layout: fixed;
    word-break: break-all;
    thead {
      th {
        background: #f0f0f0;
        border: 1px solid #cbcbcb;
        border-radius: 3px;
        // box-shadow: 0 2px 4px #bbb;
        color: #666666;
        font-weight: normal;
        height: 18px;
        line-height: 18px;
        text-align: left;
        padding: 8px 10px;

        //宽度先固定写死,之后放入list中
        &:nth-of-type(1) {
          width: 70px;
        }
        &:nth-of-type(2) {
          width: 300px;
        }
        &:nth-of-type(3) {
          width: 90px;
        }
        &:nth-of-type(4) {
          width: 80px;
        }
        &:nth-last-of-type(1) {
          width: 125px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.clauses-list {
  table {
    tr {
      &:nth-of-type(2n + 1) {
        background: #f7f7f7;
      }
      td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>