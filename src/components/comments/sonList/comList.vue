<template>
  <div class="commentList">
    <h5 class="font5">最新评论<span>({{totalNum}})</span></h5>
    <p class="line"></p>
    <div v-for='item in comdData' :key='item.commentId'>
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
      :total=parseInt(totalNum/20)>
    </el-pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui';
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
      
    }
  },
  methods:{
   
  },
  mounted(){
   
    

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