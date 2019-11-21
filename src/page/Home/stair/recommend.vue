<template>
 <div class="recommend">
   <div class="main">
      <div class="leftCon">
        <Banner/>
        <div class="content">
          <HotList/>
          <New/>
          <rowList/>
        </div>
        

      </div>
      <div class="rightCon">
        <Right/>
      </div>
   </div>
  
 </div>

</template>

<script>
import Banner from './recomment/banner'
import HotList from './recomment/hotList'
import New from './recomment/new'
import rowList from './recomment/rowList'
import Right from './recomment/right'
export default {
  components:{
    Banner,
    HotList,
    New,
    rowList,
    Right
  }
}
</script>

<style scoped lang='scss'>
.recommend {
  width: 100%;
  padding: 0 0 20px 0;
  background: #fff;
  .main {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #ddd;
    box-sizing: border-box;
    overflow: hidden;
  }

}

</style>
<style lang="scss">
.leftCon {
  width: 730px;
  height: 100%;
  float: left;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  .content {
    padding: 15px 20px;
  }
}
.rightCon {
  width: 248px;
  height: 100%;
  float: left;
  box-sizing: border-box;
}
</style>