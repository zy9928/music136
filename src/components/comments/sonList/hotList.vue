<template>
  <div class="commentList">
    <h5 class="font5">精彩评论</h5>
    <p class="line"></p>
    <div v-for='item in hotdata' :key='item.commentId'>
      <p class="smallLine"></p>
      <div class="com" >
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
    
  </div>
</template>

<script>
import { getTime } from '../util'
export default {
  props:{
    hotData: Array
  },
  computed: {
    hotdata(){
      var comDataArr = [];
      this.hotData.forEach(item=>{
        // console.log(item);
        item.time = getTime(item);
        comDataArr.push(item);
      })
      return comDataArr
    }
  },
    
  
}
</script>

<style>

</style>