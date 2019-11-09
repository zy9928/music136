<template>
  <div class="comment">
    <div class="tit">
      <h3 class="title">评论</h3>
      <span class="subTitle">共&nbsp;<b>72</b>&nbsp;条评论</span>
    </div>
    <p class="line"></p>
    <div class="com">
      <img src="../../assets/sry-profile-photo.jpg" alt="" class="photo">
      <div class="comIptBox"><textarea type="text" class="comIpt" placeholder="评论"  ref='textArea' @input="iptChangeAction"></textarea></div>
    </div>
    <div class="navBox">
      <i class="iconfont iconxiaolian"></i>
      <i class="iconfont iconaite" @click='aiteAction'></i>
      <span class="num">{{show}}</span>
      <p class="comBtn" @click='goComment'>评论</p>
      <ul class="aiteShow" ref='aiteShow'>
        <li class="selectItem ">选择最近@的人或直接输入</li>
        <li class='aiteItem' v-for='(item,index) in aiteList' :key='index' @click='aiteItemAction(index)' ref='aiteItem'>{{item}}</li>
      </ul>
    </div>
    <List></List>
  </div>
</template>

<script>
import List from './sonList/list'
import { getSongComments } from '../../services/comment'
import { log } from 'util';

export default {
  name: 'comment',
  components: {
    List
  },
  data(){
    return {
      show: 140,
      selectIndex: 0,
      aiteList:['云音乐小秘书', '网易UFO丁嘉', '网易云音乐']
    }
  },
  computed: {
    
  },
  methods: {
    //请求评论数据
    getInit() {
      let result = getSongComments();
      console.log(result);
    },
    //判断输入的字符数
    iptChangeAction(){
      this.show = 140 - this.$refs.textArea.value.length;
    },
    //点击了@的事件
    aiteAction(){
      this.$refs.aiteShow.style.display = 'block';
      this.$refs.textArea.value = '@';
    },
    //点击@选择了数据以后产生的事件
    aiteItemAction(index){
      this.selectIndex = index;
      this.$refs.textArea.value = '@' + this.$refs.aiteItem[this.selectIndex].innerText;
      this.$refs.aiteShow.style.display = 'none';
      this.show = 140 - this.$refs.textArea.value.length;

      
    },
    //去评论
    goComment(){
      if(this.show < 0){
        //不能评论

      }else{
        //可以评论
      }
    }
  },
  mounted() {
    this.getInit();
    var _this = this;
    // document.onclick = function(ev){
    //   var e = ev || window.event;
    //   if(e.target != _this.$refs.aiteShow){
    //     console.log("a")
    //     _this.$refs.aiteShow.style.display = 'none';
    //   }
    // }
  }
}
</script>

<style scoped lang='scss'>
@mixin befor {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  transform: rotate(45deg);
}
@mixin textOverflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipse;
}
.comment {
  width: 710px;
  padding: 34px 30px 34px 38px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin-left: 50px;
  .tit {
    color: #333;
    line-height:20px;
    margin-bottom: 10px;
    .title {
      display: inline-block;
      font-size: 20px;
      margin-right:20px;
    }
    .subTitle {
      font-size: 14px;
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background: #C20C0C;
    vertical-align: baseline;
    margin-bottom: 20px;
  }
  .com {
    width:100%;
    display: flex;
    position: relative;
    .photo {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .comIptBox {
      flex: 1;
      display: flex;
      height: 60px;
      margin-bottom: 8px;
      .comIpt {
        flex: 1;
        height: 60px;
        padding: 5px;
        outline: none;
        resize:none;
        border:none;
        color: #333;
        box-sizing: border-box;
        border: 1px solid #ccc;
      }
      .comIpt::placeholder {
        font-size: 12px;
      }
    }
    .comIptBox:before {
      @include befor;
      position: absolute;
      left: 55px;
      top: 12px;
    }
  }
  .navBox {
    margin-left: 60px;
    position: relative;
    .iconfont {
      color: #999;
      font-size: 18px;
    }
    .iconxiaolian {
      margin-right: 10px;
    }
    .num {
      position: absolute;
      right: 56px;
      line-height: 24px;
      color: #888;
    }
    .comBtn {
      float: right;
      width: 46px;
      height: 24px;
      background: #3080cc; 
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 24px;
      border-radius: 5px;
    }
    .aiteShow {
      width: 150px;
      padding: 5px;
      border: 1px solid #ddd;
      position: absolute;
      top: -40px;
      left: 5px;
      z-index: 20;
      background: #fff;
      display: none;
      .aiteItem, .selectItem {
        width: 100%;
        height: 20px;
        color: #555;
        line-height: 20px;
        @include textOverflow;
        cursor: pointer;
      }
      .aiteItem:hover {
        background: #eee;
      }
    }
  }
}


</style>