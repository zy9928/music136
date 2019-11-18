<template>
 <div class="recommend">
   <div class="main">
      <div class="leftCon">
        <Banner/>

      </div>
      <div class="rightCon"></div>
   </div>
  
 </div>






</template>

<script>
import Banner from './recomment/banner'
export default {
  components:{
    Banner
  }
}
</script>

<style scoped lang='scss'>
.recommend {
  width: 100%;
  padding: 0 0 20px 0;
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
}
</style>