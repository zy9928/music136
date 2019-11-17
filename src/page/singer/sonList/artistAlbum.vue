<template>
  <div class="album">
    <ul class="imgItems">
      <li class="imgItem">
        <div class="imgRow">
          <img src="../../../assets/sry-artistAlbum.jpg" alt="专辑图片" class="img">
          <div class="mask"></div>
        </div>
        <p class="tit"><a href="#">双赢</a></p>
        <p class="time">2018.9.14</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id: 12085569,
      hotAlbums: {},
      allAlbums: []
    }
  },
  mounted(){
    this.getArtistAlbum();
  },
  methods:{
    async getArtistAlbum(){
      let {data: result} = await this.$store.dispatch('artist50/getArtistAlbum',{id: this.id});
      result.hotAlbums.map(item => {
        
        this.hotAlbums = {
          'songTit': item.name,
          'pubTime': item.publishTime,
          'picUrl': item.picUrl
        }
        // console.log(this.hotAlbums);
       
        
      });
       this.allAlbums.push(this.hotAlbums);
        // console.log(this.allAlbums);
      
    }
  }
}
</script>

<style scoped lang='scss'>
.album {
  width: 100%;
  padding: 10px 0 50px 0;
  box-sizing: border-box;
  border: 1px solid #ddd; 
  margin-top: 10px;
  .imgItems {
    width: 100%;
    box-sizing: border-box;
    .imgItem {
      height: 205px;
      .imgRow {
        width: 120px;
        height: 120px;
        position: relative;
        .img {
          width: 100%;
          height: 100%;
        }
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 4px;
          right: -119px;
          background: url(../../../assets/zy_coverall.png) no-repeat -288px -856px;
        }
      }
      .tit {
        color: #333;
        font-size: 14px;
        margin: 5px 0;
      }
      .time {
        color: #777;
      }
    }
  }
}

</style>