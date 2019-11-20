<template>
  <div class="musicListBox">
    <h6 class="songListTitle">
      歌曲列表
      <span>{{dataList.length}}首歌</span>
      <p class="playCount"  v-if="dataInfo.playCount">
        播放：
        <span>{{dataInfo.playCount}}</span>次
      </p>
    </h6>
    <ul class="musicListUl">
      <li class="listTitle">
        <p class="fist"></p>
        <p class="title">歌曲标题</p>
        <p class="time">时长</p>
        <p class="singer">歌手</p>
        <p class="album">专辑</p>
      </li>
      <li class="listLi" v-for="(item, key) in arrNow" :key="key">
        <p class="fist playfist">{{item.index}}<span class="el-icon-video-play" @click="playClc(item.id)"></span></p>
        <p class="title">
          <router-link :to="`/play/${item.id}`">{{item.name}}</router-link>
        </p>
        <p class="time">{{item.time}}</p>
        <p class="ctrlBtnBox">
          <span class="addBtn el-icon-plus" @click="addClc(item.id)"></span>
          <span class="likeBtn el-icon-star-off"></span>
          <span class="shareBtn el-icon-share"></span>
          <span class="downBtn el-icon-download"></span>
        </p>
        <p class="singer">
          <router-link
            v-for="(singer, index) in item.singers"
            :key="index"
            :to="`/singer/${singer.id}`"
          >{{singer.name}}</router-link>
        </p>
        <p class="album">
          <router-link :to="`/album/${item.album.id}`">{{item.album.name}}</router-link>
        </p>
      </li>
    </ul>
    <el-pagination
      v-if="dataList.length > 30"
      background
      layout="prev, pager, next"
      :total="dataList.length/30 * 10"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrNow: []
    };
  },
  props: {
    dataList: Array,
    dataInfo: Object
  },
  methods: {
    pageChange(page) {
      this.arrNow = this.dataList.slice((page - 1) * 30, page * 30);
    },
    playClc(value){
      this.$store.commit("playBar/setPlayNowId", value);
    },
    addClc(value){
      this.$store.commit("playBar/setAddSongId", value);
    }
  },
  watch: {
    dataList(newVal, oldVal) {
      this.arrNow = this.dataList.slice(0, 30);
    }
  }
};
</script>

<style scoped lang="scss">
.musicListBox {
  .songListTitle {
    width: 100%;
    font-size: 18px;
    color: #333;
    line-height: 25px;
    margin-bottom: 5px;
    & > span {
      font-size: 12px;
      color: #666;
      margin: 0 10px;
    }
    .playCount {
      float: right;
      font-size: 12px;
      & > span {
        color: #c20c0c;
        font-weight: bold;
      }
    }
  }
  .musicListUl {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #d9d9d9;
    border-top: 2px solid #c20c0c;
    & > li {
      display: flex;
      height: 30px;
      line-height: 30px;
      & > p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 100%;
        box-sizing: border-box;
      }
      & > .fist,
      & > .singer {
        flex: 1;
      }
      & > .title {
        flex: 3;
      }
      & > .time,
      & > .ctrlBtnBox,
      & > .album {
        flex: 2;
      }
      & > .ctrlBtnBox{
        display: none;
        justify-content: center;
        align-items: center;
        &>span{
          flex: 1;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
    .listTitle {
      height: 38px;
      line-height: 38px;
      background: #f7f7f7;
      border-top: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
      & > p {
        color: #666;
        border-right: 1px solid #d9d9d9;
        padding-left: 5px;
      }
    }
    .listLi:nth-of-type(2n-1) {
      background: #ffffff;
    }
    .listLi:nth-of-type(2n) {
      background: #f7f7f7;
    }
    .listLi{
      &:hover .time{
        display: none;
      }
      &:hover .ctrlBtnBox{
        display: flex;
      }
      .playfist{
        color: #999;
        position: relative;
        text-indent: 15px;
        &>span{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 15px;
          font-size: 18px;
          font-weight: bold;
          &:hover{
            color: #444;
          }
        }
      }
      .title{
        text-indent: 10px;
      }
      .time{
        text-indent: 10px;
      }
    }
  }
}
</style>