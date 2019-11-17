<template>
  <div id="comment-item">
    <div class="head">
      <a href="#">
        <img :src="item.user.avatarUrl" alt />
      </a>
    </div>
    <div class="content">
      <p>
        <a href="#">{{item.user.nickname}}</a>
        :{{item.content}}
      </p>
      <div class="content-bottom">
        <span class="time">{{time}}</span>
        <div class="opa">
          <a href="#">
            <span class="iconfont iconzan"></span>
            <template v-if="item.likedCount>0">({{item.likedCount}})</template>
          </a>
          |
          <a href="#">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeHandle from "../../../../utils/TimeHandle";

export default {
  props: {
    item: Object
  },
  computed:{
    time(){
      return TimeHandle.getDiffTime(this.item.time);
    }
  }
};
</script>

<style scoped lang="scss">
#comment-item {
  color: #333;
  min-height: 46px;
  padding: 15px 0;
  border-bottom: 1px dotted #ccc;
  .head {
    float: left;
    height: 30px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  .content {
    min-height: 48px;
    margin-left: 40px;
    p {
      line-height: 20px;
      // overflow: hidden;
      word-break: break-all;
      a {
        color: #0c73c2;
      }
    }
    &-bottom {
      margin-top: 15px;
      overflow: hidden;
      .time {
        float: left;
      }
      .opa {
        float: right;
        color: #bbb;
        span {
          color: #0c73c2;
        }
      }
    }
  }
}
</style>