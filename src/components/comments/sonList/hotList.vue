<template>
  <div class="commentList">
    <h5 class="font5">精彩评论</h5>
    <p class="line"></p>
    <div v-for='(item, index) in hotdata' :key='item.commentId'>
      <p class="smallLine"></p>
      <div class="com" >
        <img class= 'img' :src="item.userPic" alt="">
        <div class="center">
          <h5 class="comTit">{{item.nickname}} <i class="maohao">:</i></h5><span class="speek">{{item.content}}</span>
          <p class='bottom'>{{item.time}}</p>
        </div>
        <div class="right">
          <i class="iconfont iconzan"  @click='likeAction(index)' :class='{active: selectIndex == index}'></i>
          <span class="num">({{item.likedCount}})</span> |
          <i class="reply">回复</i>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import TimeHandle from '../../../utils/TimeHandle'

export default {
  props:{
    hotData: Array
  },
  data(){
    return {
      selectIndex: ''
    }
  },
  computed: {
    hotdata(){
      var comDataArr = [];
      this.hotData.forEach(item=>{
        item.time = TimeHandle.getDiffTime(item.time);
        comDataArr.push(item);
      })
      return comDataArr;
    }
  },
  methods:{
    //点赞事件
    likeAction(index){
      if(!this.$store.state.user.isLogin){
        alert('请先登录');
      }else{
        this.selectIndex = index;

        this.hotData.forEach((item, index)=>{
        
        
        if(item.liked){
          item.likedCount++;
        }else{
          item.likedCount--;
        }
        item.liked = !item.liked;
      })
        // getSongLike(api.SONG_LIKE, 186016, id, 0, 0);
      }
  }
    
  }
}
</script>

<style scoped lang='scss'>
.active {
  color: red;
}
</style>