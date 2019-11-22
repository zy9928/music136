<template>
  <div class="commentList" v-show='show'>
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
          <span class="num" ref='num'>({{item.likedCount}})</span> |
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
      selectIndex: '',
      show: false,
      count: 0
    }
  },
  computed: {
    hotdata(){
      var comDataArr = [];
      this.hotData.forEach(item=>{
        item.time = TimeHandle.getDiffTime(item.time);
        comDataArr.push(item);
        this.show = true;
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
        
        // this.hotData.forEach((item, index)=>{
          this.selectIndex = index;
          if( this.selectIndex == index){
            console.log(index);
            this.$refs.num.innerText += 1;
            this.count++;
              // console.log(this.count);
            if(this.count%2){
              
            }else {
              return;
            }
          }
        
        // if(item.liked){
        //   item.likedCount++;
        // }else{
        //   item.likedCount--;
        // }
        // item.liked = !item.liked;
        // })
      //   // getSongLike(api.SONG_LIKE, 186016, id, 0, 0);
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