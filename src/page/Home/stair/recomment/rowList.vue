<template>
  <div class="list">
    <div class="top">
      <div class="leftCo">
        <i class="circle el-icon-s-help"></i>
        <h3 class="hotTit">榜单</h3>
      </div>
      <span class="more">
        <a href="#" class="linkMore">更多</a>
        <a class='right el-icon-right'></a>
      </span>
    </div>
    <p class="line"></p>
    <div class="main">
      <div class="left">
       <comList :idx='0'/>
      </div>
      <div class="center">
       <comList :idx='3'/>
      </div>
      <div class="right">
       <comList :idx='2'/>
      </div>
    </div>
  </div>
</template>

<script>
import comList from './listCom'
export default {
  components:{
    comList
  },
  data(){
    return {
    
    }
  },
  mounted(){

  },
  methods:{
  
  }
}
</script>

<style scopde lang='scss'>
.list {
  width: 100%;
  margin-top: 20px;
  box-sizing: border-box;
  .top {
    width: 100%;
    height: 36px;
    display: flex;
    box-sizing: border-box;
    .leftCo {
      width: 120px;
      float: left;
      .circle {
        float: left;
        color: red;
        font-size: 18px;
        margin-right: 10px;
        line-height: 36px;
        margin-top: 2px;
      }
      .hotTit {
        padding: 5px 8px;
        color: #222;
        font-size: 20px;
        font-weight: 600;
      }
    }
    .more {
      flex: 1;
      width: 100px;
      line-height: 36px;
      display: inline-flex;
      justify-content: flex-end;
      .linkMore {
        color: #555;
        font-size: 12px;
        padding-right: 5px;
      }
      .right {
        color: red;
        line-height: 36px;
        font-weight: 600;
      }
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background: #c20c0c;
    vertical-align: baseline;
    margin-bottom: 20px;
  }
  .main {
    width: 100%;
    display: flex;
    background: #f5f5f5;
    box-sizing: border-box;
    border: 1px solid #ddd;
    .left {
      flex: 1;
      border-right: 1px solid #ddd;
    }
    .center {
      flex: 1;
      border-right: 1px solid #ddd;
    }
    .right {
      flex: 1;
    }
  }
}
.head {
  height: 119px;
}
</style>