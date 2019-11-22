<template>
  <div class="commentList">
    <h5 class="font5" v-show='hide'>最新评论<span v-show='hide'>({{totalNum}})</span></h5>
    <p class="line" v-show='hide'></p>
    <div v-for='(item, index) in comdata' :key='item.commentId'>
      <p class="smallLine"></p>
      <div class="com" >
        <img class= 'img' :src="item.userPic" alt="">
        <div class="center">
          <h5 class="comTit">{{item.nickname}} <i class="maohao">:</i></h5><span class="speek">{{item.content}}</span>
          <p class='bottom'>{{item.time}}</p>
        </div>
        <div class="right">
          <i class="iconfont iconzan" @click='likeAction(index)' :class='{active: selectIndex == index}' ref='icon'></i>
          <span class="num" ref='num'>({{item.likedCount}})</span> |
          <i class="reply">回复</i>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text='<上一页'
      next-text='下一页>'
      @current-change='changeAction'
      :total=Math.ceil(totalNum/20*10)>
    </el-pagination>
  </div>
</template>

<script>
import { getSongLike } from '../../../services/comment'
import api from '../../../utils/api'
import TimeHandle from '../../../utils/TimeHandle'

export default {
  props:{
    comdData: Array,
    totalNum: String
  },
  components:{
    // [Pagination.name]: Pagination
  },
  data(){
    return{
      hide: true,
      offsetNum: '',
      lastTime: '',
      t: '',
      selectIndex: ''
    }
  },
   computed: {
    comdata(){
      var comDataArr = [];
      var value = {};
      this.comdData.forEach(item=>{
        value = {...item};
        //处理时间
        value.time = TimeHandle.getDiffTime(value.time);
        comDataArr.push(value);
      })
      return comDataArr;
    }
  },
  methods:{
    //获取点击了哪个分页器的事件
    changeAction(x){
      //计算偏移量

      this.offsetNum = (x-1)*20;
      //判断点击第二页及以后的显示
      if(x >= 2){
        this.hide = false;
      }else{
        this.hide = true;
      }

      //若评论数据超过5000，就取出前一页最后一个评论的时间戳。
      if(this.offsetNum >= 4980){
        this.lastTime = this.comdData[19].time;
      }else{
        this.lastTime = '';
      }
      this.$emit('offsetNumAction', this.offsetNum, this.lastTime);

    },

    
    //点赞事件
    likeAction(index){
      let count = 0;
      if(!this.$store.state.user.isLogin){
        alert('请先登录');
      }else{
        // count+=1;
        this.selectIndex = index;
        
        this.comdData.forEach((item, index)=>{
        console.log(item);
        // item.liked = !item.liked;
        console.log(index);
        
        if(count%2){
          this.selectIndex = index;
           item.likedCount++;
        }else {
          item.likedCount--;
        }
        // if(item.liked){
        //   item.likedCount++;
        // }else{
        //   item.likedCount--;
        // }
      })
        // getSongLike(api.SONG_LIKE, 186016, id, 0, 0);
      }
      
    }
  }

}
</script>

<style lang='scss'>
.active {
  color: red;
}
.el-pagination {
  padding: 20px 0;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #E1151D;
}
</style>