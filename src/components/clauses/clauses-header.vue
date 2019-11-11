<template>
  <div class="clauses-header">
    <div class="clauses-header-left">
      <img src alt />
    </div>
    <div class="clauses-header-right">
      <div class="zy_tx">
        <p class="type">歌单</p>
        <p class="title">「新海诚」眼中「他」与「她」的距离</p>
      </div>
      <div class="create">
        <img src="../../assets/qq.jpg" alt />
        <span class="name">染川瞳</span>
        <span class="time">2019-10-15创建</span>
      </div>
      <div class="opa">
        <a class="play" href="#">
          <span class="iconfont iconcc-play"></span>
          播放
        </a>
        <a class="add" href="#">
          <span class="iconfont iconcc-add"></span>
        </a>
        <ul class="other-opa">
          <li>
            <a href="#">
              <span class="iconfont iconcc-collect"></span>
              (7792)
            </a>
          </li>
          <li>
            <a href="#">
              <span class="iconfont iconcc-share"></span>
              (75)
            </a>
          </li>
          <li>
            <a href="#">
              <span class="iconfont iconcc-download"></span>
              下载
            </a>
          </li>
          <li>
            <a href>
              <span class="iconfont iconcc-comment"></span>
              (64)
            </a>
          </li>
        </ul>
      </div>
      <div class="text">
        <div class="tag">
          <span>标签:</span>
          <li>影视原声</li>
          <li>轻音乐</li>
          <li>治愈</li>
        </div>
        <div class="intr">
          <p>
            介绍:&nbsp;新海诚导演作品中的距离是什么？
            是「星之声」中7光年外的短信息
            是「她与她的猫」中无法交流的感情
            是「云之彼端，约定的地方」中等待一句「欢迎回来」的约定
            是「秒速五厘米」中，站在你的面前，却说不出我爱你的话语
            是「追逐繁星的孩子」中，无法接受与她离别，却迷失道路的方向
            是「言叶之庭」中，跨越心墙的雨
            是「你的名字」中，思念与身体无法通感的无奈
            是「天气之子」中，____________
            答案在你心中
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "clauses-header"
};
</script>

<style scoped lang="scss">
.clauses-header {
  padding: 36px;
  background: #fff;
  overflow: hidden;
  position: relative;
  &-left {
    width: 206px;
    height: 206px;
    border: 1px solid #d5d5d5;
    text-align: center;
    vertical-align: middle;
    position: absolute;
    left: 36px;
    top: 36px;
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