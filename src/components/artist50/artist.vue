<template>
  <div class="artist">
    <div class="leftArt">
      <div class="art-header">
      <el-button-group>
        <el-button type="primary" icon="el-icon-video-play">播放</el-button>
        <el-button type="primary" icon="el-icon-plus"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-folder-add" class="collection">收藏热门50</el-button>
      
      <el-dropdown  class='right'>
        <el-button type="primary" icon="el-icon-arrow-down" class="collection">热门单曲</el-button>
        
       
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>热门单曲</el-dropdown-item>
          <el-dropdown-item disabled>作词作品</el-dropdown-item>
          <el-dropdown-item disabled>作曲作品</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "artist"

}
</script>

<style scoped lang='scss'>
.artist {
  width: 982px;
  margin-left: 50px;
  
  border: 1px solid #ddd;
  box-sizing: border-box;
  background: #fff;
  .leftArt {
    width: 710px;
    box-sizing: border-box;
    border-right:1px solid #ddd;
    padding: 20px 30px 50px 38px;
    .collection {
      margin-left: 6px;
      color: #333;
      font-size: 12px;
      font-weight: 600;
      border-color: #ddd;
      background:  #efefef;
      padding-top: 9px;
    }
    .right {
      float: right;
    }
  }
  
  
}
</style>
<style>
.el-button--primary {
  border-color: #3F8ED8;
  background:  #3F8ED8;
}
.el-button {
  padding: 7px 10px;
  margin-top: -4px;
}
.el-icon-video-play, .el-icon-plus, .el-icon-folder-add {
  font-weight: 600;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .btnColor {
    border-color: #ddd;
    background:  #efefef;
    }
</style>