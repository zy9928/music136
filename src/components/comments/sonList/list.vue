<template>
  <div class="commentList">
    <h5 class="font5">精彩评论</h5>
    <p class="line"></p>
    <div class="com">
      <img class= 'img' src="../../../assets/sry-profile-photo.jpg" alt="">
      <div class="center">
        <h5 class="comTit">理想乌托邦 <i class="maohao">:</i></h5><span class="speek">周杰伦给别人的歌也全是精品！！</span>
        <p class='bottom'>2014年10月6日</p>
      </div>
      <div class="right">
        <i class="iconfont iconzan"></i>
        <span class="num">(15.9万)</span> |
        <i class="reply">回复</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
.commentList {
  width: 640px;
  position: relative;
  margin-top: 40px;
  box-sizing: border-box;
  .font5 {
    position: absolute;
    top: -20px;
    font-weight: 700;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #ddd;
    vertical-align: baseline;
    margin-top: 10px;
  }
  .com {
    padding: 15px 0;
    display: flex;
    .img {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .center {
      flex: 1;
      .maohao {
        color: #333;
        margin-left: 5px;
      }
      .comTit {
        float: left;
        color: #0c73c2;
        margin-right: 5px;
      }
      .bottom {
        position: absolute;
        bottom: 10px;
      }
    }
    .right {
      width: 120px;
      float: right;
      text-align: right;
      position: absolute;
      bottom: 10px;
      right: 0;
      .iconzan {
        margin-right: 10px;
      }
      .reply {
        color: #666;
      }
    }
  }
}
</style>