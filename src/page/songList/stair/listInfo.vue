<template>
  <div class="listInfo">
    <h5 class="listName">
      <span>
        歌单
        <i>®</i>
      </span>
      {{dataList.name}}
    </h5>
    <div class="createrBox">
      <router-link :to="`/user/${dataCreater.id}`">
        <img :src="dataCreater.img" alt />
      </router-link>
      <router-link :to="`/user/${dataCreater.id}`" class="name">{{dataCreater.name}}</router-link>
      <span class="time">{{dataCreater.creatTime}}</span>创建
    </div>
    <p class="pagePlayCtrl">
      <span class="playBtn">
        <i class="el-icon-video-play"></i>
        <i title="播放">播放</i>
        <i class="el-icon-plus addBtn" title="添加到播放列表"></i>
      </span>
      <span class="likeBtn" title="收藏">
        <i class="el-icon-star-off"></i>
        ({{dataList.subscribedCount}})
      </span>
      <span class="shareBtn" title="分享">
        <i class="el-icon-share"></i>
        ({{dataList.shareCount}})
      </span>
      <span class="downBtn" title="下载">
        <i class="el-icon-download"></i>下载
      </span>
      <a href="#comment" class="commentBtn" title="评论">
        <i class="el-icon-s-comment"></i>
        ({{dataList.commentCount}})
      </a>
    </p>
    <p class="tags">
      标签：
      <span v-for="(item, key) in dataList.tags" :key="key">{{item}}</span>
    </p>
    <p class="description" v-html="`介绍：${dataList.description}`"></p>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {},
    dataCreater: {},
  }
};
</script>

<style scoped lang="scss">
.listInfo {
  float: left;
  width: 432px;
  padding: 0 0 0 25px;
  box-sizing: border-box;
  margin-bottom: 30px;
  .listName {
    font-size: 26px;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    padding-left: 68px;
    & > span {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      width: 59px;
      height: 26px;
      background: url(./../../../assets/cc-tag.png) no-repeat 0 0;
      color: #fcf0f0;
      line-height: 26px;
      box-sizing: border-box;
      padding-left: 10px;
      & > i {
        position: absolute;
        transform: scale(0.7);
        top: -5px;
        right: 10px;
      }
    }
  }
  .createrBox {
    display: flex;
    align-items: center;
    color: #999;
    margin: 20px 0 10px;
    & > a {
      width: 35px;
      height: 35px;
      display: block;
      & > img {
        width: 35px;
        height: 35px;
      }
    }
    .name {
      width: auto;
      height: auto;
      font-size: 14px;
      color: #0c73c2;
      margin: 0 10px;
    }
    .time {
      font-size: 12px;
      color: #999;
      margin: 0 5px;
    }
  }
  .pagePlayCtrl {
    width: 100%;
    padding: 10px 0;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    & > span,
    & > a {
      display: inline-block;
      font-size: 16px;
      line-height: 30px;
      background: #f1f1f1;
      padding: 0 5px;
      border-radius: 5px;
      color: #666666;
      cursor: pointer;
      & > i {
        padding: 0 3px;
      }
    }
    .playBtn {
      background: #3988d3;
      color: #ffffff;
      .addBtn {
        border-left: 1px solid #666;
        display: inline-block;
      }
    }
  }
  .tags{
    color: #999;
    display: flex;
    align-items: center;
    margin: 10px 0;
    &>span{
      display: block;
      padding: 1px 10px;
      background: #F5F5F5;
      border: 1px solid #D1D1D1;
      border-radius: 10px;
      margin: 0 5px;
    }
  }
  .description{
    color: #666;
  }
}
</style>