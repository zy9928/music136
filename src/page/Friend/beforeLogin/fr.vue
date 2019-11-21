<template>
  <div class="myMusicForAll">
    <div class="view-wrap">
      <div class="forall-left">
        <img src="../../../assets/music_nologin.jpg" alt />
      </div>
      <div class="forall-right">
        <h1>关注明星&nbsp;发现精彩</h1>
        <p>你可以关注明星和好友品味他们的私房歌单</p>
        <p>通过他们的动态发现更多精彩音乐</p>
        <button @click="openWindowAciton">立即登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    openWindowAciton(){
      this.$center.$emit('openWindow',true);
    }
  }
};
</script>

<style lang="scss" scoped >
.myMusicForAll {
  height: 678px;
  background: #f5f5f5;
  .view-wrap {
    height: 100%;

    background: #fff;
    .forall-left {
      margin-top: 105px;
      float: left;
      margin-left: 87px;
    }
    .forall-right {
      margin-top: 105px;
      float: left;
      margin-left: 112px;
      h1{
        font-size:32px;
        color: #333;
        margin-bottom: 11px;
        font-weight: bold;
      }
      p{
        line-height: 24px;
        font-size: 16px;
        color: #333;
      }
      img{
        margin-top: 22px;
        margin-bottom: 38px;
      }
      button{
        width: 168px;
        height: 44px;
        text-align: center;
        line-height: 44px;
        border: 0;
        outline: none;
        border-radius: 8px;
        color: #fff;
        background: #2677c5;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>