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
      <div class="listItem" v-for='(item, index) in this.listArr.slice(0, 10)' :key='index' >
        <i class="num">{{(index++)+1}}</i>
        <router-link class="tit" :to='`/play/${item.id}`'>{{item.songName}}</router-link>
        <span class="ic">
          <i class='icc el-icon-video-play' title="播放" @click='playAction(item.id)'></i>
          <i class='icc cen el-icon-plus' title="添加到播放列表" @click='addPlayAction(item.id)'></i>
          <i class='icc el-icon-folder-add' title="收藏"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { loadavg } from 'os';
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
    //请求榜单数据
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
      
    },
    //播放
    playAction(id){
      this.$store.commit("playBar/setPlayNowId", id);
    },
    //添加到歌曲列表
    addPlayAction(id){
      this.$store.commit("playBar/setAddSongId", id)
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
        float: left;
        text-align: center;
        font-size: 12px;
        color: #444;
        margin-right: 20px;
      } 
      .tit {
        float: left;
        width: 100px;
        font-size: 12px;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ic {
        vertical-align: middle;
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