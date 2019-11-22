<template>
  <div class="page" id="searchResult">
    <section class="searchPageBox">
      <input type="text" v-model="keywords" />
      <span class="sub el-icon-search"></span>
    </section>
    <p class="searchText">
      搜索“{{keywords}}”,找到
      <span>{{result.count ? result.count : '0'}}</span>
      {{getNowTitle(type)}}
    </p>
    <searchNav v-model="type" />
    <musicList v-if="type == 1" :dataList="result.data" :dataInfo="{}"></musicList>
  </div>
</template>

<script>
import searchNav from "./../stair/searchNav";
import musicList from './../../../components/musicList/musicList';
import { mapState } from "vuex";
export default {
  components: {
    searchNav,
    musicList
  },
  data() {
    return {};
  },
  props: {
    type: "",
    keywords: ""
  },
  computed: {
    ...mapState({
      result: state => state.search.result
    })
  },
  methods: {
    // 获取资源
    getData() {
      this.$store.dispatch("search/getSearchResult", {
        type: this.type,
        keywords: this.keywords
      });
    },
    getNowTitle(val) {
      switch (val) {
        case "1":
          return "首单曲";
        case "10":
          return "张专辑";
        case "100":
          return "个歌手";
        case "1000":
          return "个歌单";
        case "1002":
          return "个用户";
        case "1004":
          return "个MV";
        case "1006":
          return "个歌词";
        case "1009":
          return "个电台";
        case "1014":
          return "个视频";
      }
    }
  },
  mounted() {
    if (this.keywords) {
      this.getData();
    }
  },
  updated() {
    if (this.keywords) {
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
#searchResult {
  padding: 50px 40px 0;
  box-sizing: border-box;
  background: #fff;
  min-height: 100vh;
  .searchPageBox {
    width: 500px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    & > input {
      height: 100%;
      border: none;
      box-shadow: 0 0 10px #999 inset;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 14px;
      vertical-align: middle;
      width: 448px;
      outline: none;
    }
    & > span {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      line-height: 48px;
      width: 50px;
      background: #f5f5f5;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      color: #8d8e8e;
      border-left: 2px solid #ccc;
    }
  }
  .searchText {
    width: 100%;
    line-height: 30px;
    margin: 20px 0;
  }
}
</style>