<template>
  <div class="com">
    <div class="head">
      <img src="../../../../assets/sry-artistAlbum.jpg" alt="" class="img">
      <div class="ri">
        <h3 class="tit">函数的好久好久</h3>
        <i class='icon el-icon-video-play'></i>
        <i class='icon el-icon-folder-add'></i>
      </div>
    </div>
    <ul class="listItems">
      <li class="listItem">
        <i class="num">1</i>
        <span class="tit">weddsadx</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang='scss'>
.com {
  width: 100%;
  .head {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .img {
      float: left;
      width: 80px;
      height: 80px;
    }
    .ri {
      margin-left: 90px;
      .tit {
        color: #222;
        font-size: 14px;
        font-weight: 600;
      }
      .icon {
        color: #888;
        font-size: 24px;
        margin: 10px 5px 10px 0;
      }
    }
  }
}
</style>