<template>
  <div class="event">
    <div class="event-header">
      <div class="event-header-title">
        <div class="event-header-title-img">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="event-header-title-text">
          <span class="name">{{item.user.nickname}}</span>
          <span class="action">{{resourceType[item.type]}}</span>
          <p class="time">最近</p>
        </div>
      </div>
    </div>
    <div class="event-content">
      <p class="message" v-html="$options.filters.format(jsonData.msg)"></p>
      <div class="video" v-if="item.type==39">
        <img :src="jsonData.video.coverUrl" alt />
        <h1>
          {{jsonData.video.title}}
          <span>-by{{jsonData.video.creator.nickname}}</span>
        </h1>
        <span class="play iconfont iconcc-play"></span>
        <!-- 播放量 -->
        <p class="playNum">
          <span class="iconfont iconcc-play"></span>
          {{playTime}}
        </p>
        <p class="playDuration">
          <!-- <span class="iconfont iconcc-play"></span> -->
          {{duration}}
        </p>
      </div>
    </div>
    <div class="event-bottom">
      <div>
        <a href="#" @click.prevent="likeAction">
          <span class="iconfont iconzan" :class="{isLike:item.info.liked}"></span>
          ({{item.info.likedCount}})
        </a>|
        <a href="#">转发({{item.info.shareCount}})</a>|
        <a href="#" @click.prevent="commentAction">评论({{item.info.commentCount}})</a>
      </div>

      <event-comment :threadId="item.info.threadId" v-show="showComment" v-model="showComment"></event-comment>
    </div>
    <div class="concern">
      <button>
        <span class="iconfont iconcc-add"></span>
        关注
      </button>
      <span class="arrow iconfont iconcc-up"></span>
    </div>
  </div>
</template>

<script>
import TimeHandle from "../../../../utils/TimeHandle";

export default {
  name: "Event",
  props: {
    item: Object
  },
  components: {
    "event-comment": () => import("./event-comment")
  },
  data() {
    return {
      resourceType: {
        "39": "发布视频",
        "18": "分享单曲",
        "19": "发布专辑"
      },
      showComment: false,
      comments: [],
      requestCount:0,//请求次数计数器
    };
  },
  computed: {
    jsonData() {
      return JSON.parse(this.item.json);
    },
    playTime() {
      return this.jsonData.video.playTime < 100000
        ? this.jsonData.video.playTime
        : (this.jsonData.video.playTime / 10000).toFixed(1) + "万";
    },
    duration() {
      return TimeHandle.getMS(this.jsonData.video.durationms);
    }
  },
  filters: {
    format(value) {
      value = value.replace(/\n/g, "<br/>");
      return value;
    }
  },
  methods: {
    //给动态点赞
    async likeAction() {
      let params = {
        t: this.item.info.liked ? 0 : 1,
        threadId: this.item.info.threadId,
        type: "6"
      };
      try {
        let result = await this.$store.dispatch("event/likeEvent", params);
        console.log(result);
        this.item.info.liked = !this.item.info.liked;
        if (params.t == "1") {
          this.item.info.likedCount++;
        } else {
          this.item.info.likedCount--;
        }
      } catch (error) {
        console.log(error);
        alert("点赞失败");
      }
    },
    //展开收起评论并获取评论
    async commentAction() {
      this.showComment = !this.showComment;

      if (this.requestCount== 0) {
        try {
          let result = await this.$store.dispatch(
            "event/getEventComment",
            this.item.info.threadId
          );
          this.requestCount++;
          let comments = result.data.comments;
          let hotComments = result.data.hotComments;
          let threadId = this.item.info.threadId;
          this.$store.commit("event/setComments",{comments,threadId});
          this.$store.commit("event/setHotComments",{hotComments,threadId});

        } catch (error) {
          console.log(error);
          alert("获取评论失败");
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
// .fold {
//   animation: fold 0.25s linear;
// }
// .expand {
//   animation: expand 0.25s linear;
// }
// @keyframes fold {
//   from {
//     height: 152px;
//   }
//   to {
//     height: 0;
//   }
// }
// @keyframes expand {
//   from {
//     height: 0;
//   }
//   to {
//     height: 152px;
//   }
// }
//已经点赞样式
.isLike {
  color: #be2914;
}
.event {
  border-bottom: 1px solid #e8e8e9;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  .concern {
    position: absolute;
    top: 14px;
    right: 0;
    button {
      float: left;
      cursor: pointer;
      width: 60px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      background: #fafafa;
      font-size: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      .iconfont {
        color: #be2914;
        font-size: 12px;
      }
    }
    .arrow {
      display: inline-block;
      transform: rotate(180deg);

      font-size: 12px;
      padding-right: 10px;
      padding-bottom: 2px;
      cursor: pointer;
    }
  }
  &-header {
    &-title {
      margin-top: 20px;
      height: 45px;
      &-img {
        height: 100%;
        width: 45px;
        float: left;
        img {
          height: 100%;
        }
      }
      &-text {
        float: left;
        margin-left: 10px;
        height: 100%;
        font-size: 12px;
        .name {
          color: #0c88d3;
        }
        .action {
          color: #666;
          padding-left: 5px;
        }
        .time {
          margin-top: 13px;
          color: #999;
        }
      }
    }
  }
  &-content {
    padding: 18px 0 18px 57px;
    overflow: hidden;
    .message {
      width: 100%;
      font-size: 14px;
      line-height: 24px;
      margin-top: 10px;
      word-break: break-word;
      color: #333;
    }
    .video {
      width: 339px;
      margin-top: 6px;
      position: relative;
      img {
        width: 339px;
      }
      h1 {
        top: 10px;
        left: 8px;
        position: absolute;
        width: 318px;
        color: #fff;
        font-size: 14px;
        span {
          font-size: 12px;
          color: #c1c1c3;
        }
      }
      .play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #e2dbd4;
        &:hover {
          color: #ccc;
          cursor: pointer;
        }
      }
      .playNum {
        position: absolute;
        left: 10px;
        bottom: 10px;
        color: #fff;
        .iconfont {
          font-size: 12px;
        }
      }
      .playDuration {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #fff;
      }

      .iconfont {
        font-size: 30px;
      }
    }
  }
  &-bottom {
    min-height: 12px;
    text-align: right;
    // right: 0;
    margin-bottom: 20px;
    color: #d1dfff;
    a {
      padding: 0 10px;
      color: #0e73ba;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
