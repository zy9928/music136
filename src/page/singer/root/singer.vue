<template>
  <div class="art">
    <div class="leftAr">
      <h2 class="tit">{{name}}</h2>
      <div class="artCon">
        <img :src="picUrl" alt="歌手图片" class="artImg" />
        <div class="mask"></div>
        <el-button type="primary" icon="el-icon-user" class="mine btn">个人主页</el-button>
        <el-button type="primary" icon="el-icon-folder-add" class="coll btn">收藏</el-button>
      </div>
      <nav class="navItems">
        <router-link
          class="navItem"
          v-for="item in navList"
          :key="item.index"
          :to="item.to"
        >{{item.title}}</router-link>
      </nav>

      <router-view />
    </div>
    <pageAside kind="singer"/>
  </div>
</template>

<script>
import ArtistList from "../sonList/artistList";
import pageAside from './../../../components/pageAside/pageAside';
import {mapState} from "vuex"
export default {
  name: "artist",
  computed: {
    ...mapState({
      name: state=>state.artist50.name,
      picUrl: state=>state.artist50.picUrl,

    })
  },
  components: {
    ArtistList,
    pageAside
  },
  props: {
    id: ""
  },
  data() {
    return {
      navList: [
        { to: `/singer/${this.id}/list`, title: "热门作品", index: 0 },
        { to: `/singer/${this.id}/album`, title: "所有专辑", index: 1 },
        { to: `/singer/${this.id}/mv`, title: "相关MV", index: 2 },
        { to: `/singer/${this.id}/desc`, title: "艺人介绍", index: 3 }
      ]
    };
  },
  mounted(){
    //初始样式
    this.rememberId();
  },
  methods: {
    rememberId(){
      this.$store.commit("aside/setSingerId", this.id);
    }
  },
  updated(){
    this.rememberId();
  }
};
</script>

<style scoped lang='scss'>
.art {
  width: 982px;
  margin: 0 auto;
  padding: 0 0 50px 0;
  border: 1px solid #ddd;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  .leftAr {
    width: 710px;
    box-sizing: border-box;
    padding: 20px 30px 50px 38px;
    border-right: 1px solid #ddd;
    float: left;
    .tit {
      color: #222;
      font-size: 22px;
      margin-bottom: 5px;
    }
    .artCon {
      width: 640px;
      height: 300px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      .artImg {
        width: 100%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
      }
      .mask {
        width: 640px;
        height: 300px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.7;
        border-right: 1px solid #ddd;
        background: linear-gradient(
          to top,
          #858585 10%,
          #ccc 20%,
          transparent 40%
        );
      }
      .btn {
        position: absolute;
        bottom: 20px;
        opacity: 0.7;
      }
      .mine {
        right: 110px;
      }
      .coll {
        right: 20px;
      }
      .el-button--primary {
        border-color: #444;
        background: #444;
      }
    }
    .navItems {
      width: 100%;
      height: 38px;
      background: #f8f8f8;
      display: flex;
      border: 1px solid #ccc;
      .navItem {
        flex: 1;
        display: flex;
        height: 38px;
        line-height: 38px;
        justify-content: center;
        color: #333;
        font-size: 14px;
        &:hover {
          position: relative;
          top: -1px;
          border-top: 2px solid red;
        }
      }
      .router-link-active {
        position: relative;
        top: -1px;
        border-top: 2px solid red;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        background: #fafafa;
      }
    }
  }
}
</style>
<style lang="scss">
</style>