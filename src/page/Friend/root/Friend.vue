<template>
  <div class="friend">
    <div class="view-wrap">
      <div class="friend-left">
        <div class="friend-left-title">
          <h1>动态</h1>
          <div class="opa">
            <a href="#">
              <span class="iconfont"></span>
              发动态
            </a>
            <a href="#">
              <span class="iconfont"></span>
              发布视频
            </a>
          </div>
        </div>
      </div>
      <div class="friend-right"></div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";

export default {
  //路由拦截
  beforeRouteEnter(to, from, next) {
    console.log("进入朋友页面");
    if (!store.state.user.isLogin) {
      router.push("/fr");
    } else {
      next();
    }
  }
};
</script>

<style scopde lang="scss">
.friend {
  min-height: 678px;
  background: #f5f5f5;
  .view-wrap {
    background: #fff;
    min-height: 678px;
    .friend-left {
      margin-right: 300px;
      padding: 20px 30px;
      &-title {
        height: 42px;
        border-bottom: 1px solid #c20c0c;
        line-height: 42px;
        h1 {
          float: left;
          color: #333;
          font-size: 22px;
        }
        .opa {
          float: right;
          font-size: 12px;
          a {
            color: #333;
            padding: 6px 9px;
            border-radius: 28px;
            border:1px solid #ccc;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>