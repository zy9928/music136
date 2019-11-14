<template>
  <div class="commentList">
    <h5 class="font5" v-show='hide'>最新评论<span v-show='hide'>({{totalNum}})</span></h5>
    <p class="line" v-show='hide'></p>
    <div v-for='item in comdata' :key='item.commentId'>
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
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text='<上一页'
      next-text='下一页>'
      @current-change='changeAction'
      :total=Math.floor(totalNum/20)>
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
import { getTime } from '../util'

export default {
  props:{
    comdData: Array,
    totalNum: String
  },
  components:{
    [Pagination.name]: Pagination
  },
  data(){
    return{
      hide: true,
      offsetNum: '',
      lastTime: '',
    }
  },
   computed: {
    comdata(){
      var comDataArr = [];
      this.comdData.forEach(item=>{
        // console.log(item);
        item.time = getTime(item);
        comDataArr.push(item);
      })
      return comDataArr
    }
  },
  methods:{
    changeAction(x){
      // console.log(x);
      this.offsetNum = (x-1)*20;
      // console.log(this.offsetNum);
      this.$emit('offsetNumAction', this.offsetNum, this.lastTime);

      //判断点击第二页及以后的显示
      if(x >= 2){
        this.hide = false;
      }else{
        this.hide = true;
      }

      if(this.offsetNum >= 4980){
        // console.log(this.comdData[19]);
        // this.lastTime = this.comdData[19].time;
        console.log(this.comdData);
      }
    }
  }

}
</script>

<style lang='scss'>
.el-pagination {
  padding: 20px 0;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #E1151D;
}
</style>