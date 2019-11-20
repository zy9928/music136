<template>
  <div class="com" >
    <div class="head">
      <img :src="this.topObj.picUrl" alt="" class="img">
      <div class="ri">
        <h3 class="tit">{{this.topObj.name}}</h3>
        <i class='icon el-icon-video-play'></i>
        <i class='icon el-icon-folder-add'></i>
      </div>
    </div>
    <div class="listItems">
      <router-link class="listItem" v-for='(item, index) in this.listArr.slice(0, 10)' :key='index' :to='`/play/${item.id}`'>
        <i class="num">{{(index++)+1}}</i>
        <span class="tit">{{item.songName}}</span>
        <span class="ic">
          <a href="#" title="播放"><i class='icc el-icon-video-play'></i></a>
          <a href="#" title="添加到播放列表"><i class='icc cen el-icon-plus'></i></a>
          <a href="#" title="收藏"><i class='icc el-icon-folder-add'></i></a>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    idx: Number
  },
  data(){
    return {
      // idx: 0,   //0:新歌  2：原创  3：飙升
      listArr: [],
      topObj: {}
    }
  },
  mounted(){
    this.getTopList();
  },
  methods:{
    async getTopList(){
      let {data: result} = await this.$store.dispatch('home/getTopList', {idx: this.idx});
      // console.log(result.playlist);
      this.topObj = {
        'name': result.playlist.name,
        'picUrl': result.playlist.coverImgUrl
      };
      result.playlist.tracks.map(item => {
        let messObj = {
          'id': item.id,
          'songName': item.name
        }
        // Object.assign(listObj, messObj);
        this.listArr.push(messObj);
      });
      
    }
  }
}
</script>

<style scoped lang='scss'>
.com {
  width: 100%;
  .head {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
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
  .listItems {
    width: 100%;
    .listItem {
      display: block;
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      .num {
        display: inline-block;
        text-align: center;
        font-size: 12px;
        color: #444;
        margin-right: 20px;
      } 
      .tit {
        display: inline-block;
        width: 100px;
        font-size: 12px;
        color: #444;
      }
      .ic {
        float: right;
        padding: 0 5px;
        .icc {
          font-size: 14px;
          font-weight: 500;
        }
        .cen {
          margin: 0 5px;
         }
        
      }
    }
    
    .listItem:nth-of-type(odd) {
      background: #e8e8e8;
    }
    .listItem:nth-of-type(even) {
      background: #f4f4f4;
    }
  }
}
</style>
<style lang="scss">

</style>