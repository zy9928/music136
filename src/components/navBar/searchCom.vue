<template>
  <div class="searchWarp">
    <div
      class="searchSuggestBox"
      v-if="dataFocu && suggest.order && suggest.order.length != 0"
    >
    <!-- v-if="dataFocu && suggest.order && suggest.order.length != 0" -->
    <!-- :to="{ name: 'search', params: {type: 1, keywords: dataKey} }" -->
      <router-link :to="`/search/${1002}/${dataKey}`" class="searchUser">搜‘{{dataKey}}’相关用户 ></router-link>
      <ul class="searchSugBox">
        <li class="kinds" v-for="(kind, key) in suggest.order" :key="key">
          <span class="kindTitle" :class="kindTitle(kind).ico"> {{kindTitle(kind).title}} </span>
          <router-link v-for="(item, key) in suggest[kind]" :key="key" :to="`${kindTitle(kind).to}/${item.id}`">{{item.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dataFocu: "",
    dataKey: ''
  },
  computed: {
    ...mapState({
      suggest: state => state.search.suggest
    })
  },
  methods: {
    kindTitle(str){
      if(str == "songs"){
        return {
          title: "单曲",
          ico: "el-icon-headset",
          to: "/play"
        }
      }else if(str == "artists"){
        return {
          title: "歌手",
          ico: "el-icon-user",
          to: "/singer"
        }
      }else if(str == "albums"){
        return {
          title: "专辑",
          ico: "el-icon-help",
          to: "/album"
        }
      }else if(str == "mvs"){
        return {
          title: "视频",
          ico: "el-icon-video-camera",
          to: "/mv"
        }
      }else if(str == "playlists"){
        return {
          title: "歌单",
          ico: "el-icon-document",
          to: "/songList"
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.searchWarp {
  .searchSuggestBox {
    position: absolute;
    width: 240px;
    border-radius: 3px;
    border: 1px solid #bebebe;
    min-height: 20px;
    background: #fff;
    left: 0;
    top: 55px;
    z-index: 100;
    .searchUser{
      line-height: 35px;
      color: #666;
      text-indent: 10px;
      border-bottom: 1px solid #ccc;
      display: block;
    }
    .searchSugBox{
      width: 100%;
      box-sizing: border-box;
      padding-left: 70px;
      &>li{
        position: relative;
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        &:nth-of-type(2n){
          background: #F9F8F8;
        }
        &:nth-last-of-type(1){
          border-bottom: none;
        }
        &>a{
          display: block;
          line-height: 24px;
          width: 100%;
          box-sizing: border-box;
          text-indent: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &>.kindTitle{
          position: absolute;
          top: 0px;
          left: -70px;
          display: block;
          width: 70px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
  }
}
</style>