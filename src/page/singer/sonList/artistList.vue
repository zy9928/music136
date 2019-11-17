<template>
  <div class="leftArt">
    <div class="art-header">
      <el-button-group>
        <el-button type="primary" icon="el-icon-video-play">播放</el-button>
        <el-button type="primary" icon="el-icon-plus"></el-button>
      </el-button-group>
      <el-button type="primary" icon="el-icon-folder-add" class="collection">收藏热门50</el-button>
      <el-dropdown  class='right'>
        <el-button type="primary" icon="el-icon-arrow-down" class="collection hot">热门单曲</el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >热门单曲</el-dropdown-item>
          <el-dropdown-item disabled>作词作品</el-dropdown-item>
          <el-dropdown-item disabled>作曲作品</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="artList">
      <p class="aItem">
        <i class="order">1</i>
        <i class="el-icon-video-play iconPlay"></i>
        <a href="#" class="name">呼吸决定</a>
        <span class="time">04:06</span>
        <a href="#" class="com">I'm Sorry</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id: 6452
    }
  },
  mounted(){
    this.getArtist50()

  },
  methods: {
    async getArtist50(){
      // let result = await this.$store.dispatch('artist50/getArtist50', {id: this.id});
      // console.log(result);
      
    }
  }
}
</script>

<style scoped lang='scss'>
.leftArt {
  width: 100%;
  margin-top: 20px;
  .art-header {
    margin-bottom: 10px;
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
      .hot {
        padding: 7px 15px;
      }
    }
  }
  .aItem {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #333;
    font-size: 12px;
    background: #eee;
    position: relative;
    display: flex;
    .order {
      display: flex;
      width: 30px;
      justify-content: center;
    }
    .iconPlay {
      width: 30px;
      margin: 0 10px;
      font-size: 14px;
      line-height: 30px;
      text-align: center;
    }
    .name {
      width: 320px;
    }
    .time {
      width: 80px;
      margin: 0 20px 0 10px;
    }
    .com {
      flex: 1;
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