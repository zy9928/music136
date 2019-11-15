<template>
  <div class="clauses-header">
    <div class="clauses-header-left">
      <img :src="picture" alt />
    </div>
    <div class="clauses-header-right">
      <div class="zy_tx">
        <p class="type">{{type}}</p>
        <p class="title">{{title}}</p>
      </div>
      <div class="create">
        <img :src="creatorImg" alt />

        <span class="name">{{creator}}</span>
        <span class="time">{{createTime}}</span>
      </div>
      <div class="opa">
        <a class="play" href="#">
          <span   class="iconfont iconcc-play"></span>
          播放
        </a>
        <a class="add" href="#">
          <span class="iconfont iconcc-add"></span>
        </a>
        <ul class="other-opa">
          <li>
            <a href="#">
              <span class="iconfont iconcc-collect"></span>
            {{collectText}}
            </a>
          </li>
          <li>
            <a href="#">
              <span class="iconfont iconcc-share"></span>
              {{shareText}}
            </a>
          </li>
          <li>
            <a href="#">
              <span class="iconfont iconcc-download"></span>
              {{downloadText}}
            </a>
          </li>
          <li>
            <a href>
              <span class="iconfont iconcc-comment"></span>
              {{commentText}}
            </a>
          </li>
        </ul>
      </div>
      <div class="text">
        <div class="tag" v-show="tags&&tags.length>0">
          <span>标签:</span>
          <li v-for="item in tags" :key="item">
            {{item}}
          </li>
        </div>
        <div class="intr" v-show="desc">
          <p>介绍:&nbsp;{{desc}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "clauses-header",
  props: {
    type: {
      //条目类型
      type: String,
      default: "歌单"
    },
    title: {
      //条目标题
      type: String,
      required: true
    },
    creator: {
      //条目创建者
      type: String,
      required: true
    },
    creatorImg: {
      //创建者头像
      type: String,
      required: true
    },

    createTime: {
      //创建时间
      type: String,
      required: true
    },

    picture: String, //条目图片
    tags: {
      type:Array
    }, //条目标签
    desc: String, //条目描述

    collectText: {
      type: String,
      default: "收藏"
    },
    shareText: {
      type: String,
      default: "分享"
    },
    downloadText: {
      type: String,
      default: "下载"
    },
    commentText: {
      type: String,
      default: "评论"
    }
  }
};
</script>

<style scoped lang="scss">
.clauses-header {
  padding: 36px;
  min-height: 207px;
  background: #fff;
  overflow: hidden;
  position: relative;
  &-left {
    width: 200px;
    height: 200px;
    border: 1px solid #d5d5d5;
    position: absolute;
    left: 36px;
    top: 36px;
    padding: 3px;
    img {
      width: 200px;
      height: 200px;
    }
  }
  &-right {
    margin-left: 233px;
    .type {
      width: 54px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      background: url("../../assets/cc-tag.png") 100% 100%;
      float: left;
      color: #fff;
      font-size: 14px;
    }
    .title {
      float: left;
      margin-left: 7px;
      width: 325px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
      font-size: 18px;
      line-height: 24px;
    }
    .create {
      height: 35px;
      line-height: 35px;
      margin-top: 10px;
      font-size: 12px;

      img {
        width: 35px;
        height: 35px;
        float: left;
      }
      .name {
        color: #0c73c2;
        padding-left: 10px;
      }
      .time {
        color: #9999;
        padding-left: 16px;
      }
    }
    .opa {
      height: 30px;
      margin-top: 20px;
      a {
        display: inline-block;
        font-size: 12px;
      }
      .play {
        height: 28px;
        line-height: 28px;
        width: 60px;
        text-align: center;
        background: #418fd9;
        border: 2px solid #225a90;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        float: left;
        color: #fff;
        .iconfont {
          font-size: 16px;
        }
      }
      .add {
        color: #fff;
        height: 28px;
        width: 28px;
        text-align: center;
        line-height: 28px;
        border: 2px solid #64aaeb;
        float: left;
        background: #418fd9;
        // border-top-right-radius: 8px;
        // border-bottom-right-radius: 8px;
        .iconfont {
          font-size: 12px;
        }
      }
      .other-opa {
        float: left;
        height: 34px;
        li {
          float: left;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 2px solid #c3c3c3;
          border-radius: 6px;
          margin-left: 6px;
          padding: 0 8px;
          background: #fefefe;
          a {
            color: #333;
          }
          .iconfont {
            color: #666;
          }
        }
      }
    }
    .text {
      font-size: 12px;
      color: #666;
      margin-top: 26px;
      .tag {
        height: 24px;
        line-height: 24px;
        span {
          float: left;
        }
        li {
          float: left;
          list-style: none;
          height: 22px;
          line-height: 22px;
          font-size: 14px;
          padding: 0 10px;
          border: 1px solid #c7c7c7;
          border-radius: 6px;
          margin-left: 5px;
        }
      }
      .intr {
        line-height: 36px;
      }
    }
  }
}
</style>