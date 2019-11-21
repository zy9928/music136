<template>
  <div class="myMusicForAll">
    <div class="view-wrap">
      <div class="forall-left">
        <img src="../../../assets/cc-friend.png" alt />
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
      img{
        width: 466px;
      }
    }
    .forall-right {
      margin-top: 180px;
      float: left;
      margin-left: 82px;
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
      button{
        width: 168px;
        height: 44px;
        margin-top: 38px;
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