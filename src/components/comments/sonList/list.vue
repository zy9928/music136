<template>
  <div class="commentList">
    <h5 class="font5">精彩评论</h5>
    <p class="line"></p>
    <div class="com" v-for='item in data' :key='item.commentId'>
      <img class= 'img' :src="item.userPic" alt="">
      <div class="center">
        <h5 class="comTit">{{item.nickname}} <i class="maohao">:</i></h5><span class="speek">{{item.content}}</span>
        <p class='bottom'>{{item.time}}</p>
      </div>
      <div class="right">
        <i class="iconfont iconzan"></i>
        <span class="num">({{item.likedCount}})</span> |
        <i class="reply">回复</i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    data: Array
  },
  data(){
    return{
      
    }
  },
  methods:{
   
  },
  mounted(){
   
    

  }
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
    position: relative;
    .img {
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 10px;
      background: #efefef;
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