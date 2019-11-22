<template>
  <div class="new">
     <div class="top">
      <div class="leftCo">
        <i class="circle el-icon-s-help"></i>
        <h3 class="hotTit">新碟上架</h3>
      </div>
      <span class="more">
        <a href="#" class="linkMore">更多</a>
        <a class='right el-icon-right'></a>
      </span>
    </div>
    <p class="line"></p>
    <div class="ban">
      <div class="swiper-container" ref="banner">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="rowItems">
              <router-link class="rowItem" v-for='(item,index) in this.songArr.slice(0,5)' :key='index' :to='`/album/${item.songId}`'>
                <img :src="item.picUrl" alt="轮播图" class="img" />
                <p class="mask"></p>
                <p class="tit"><a href="#">{{item.songName}}</a></p>
                <p class="nam"><a href="#">{{item.name}}</a></p>
              </router-link>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="rowItems">
              <router-link class="rowItem" v-for='(item,index) in this.songArr.slice(5,10)' :key='index' :to='`/album/${item.songId}`'>
                <img :src="item.picUrl" alt="轮播图" class="img"/>
                <p class="mask"></p>
                <p class="tit"><a href="#">{{item.songName}}</a></p>
                <p class="nam"><a href="#" class='na'>{{item.name}}</a></p>
              </router-link>
            </div>
          </div>
        </div>
  
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      songArr: []
    }
  },
  mounted(){
    this.getAlbumNewest()
    .then(() => {
      var MySwiper = new Swiper(this.$refs.banner, {
        direction: "horizontal", // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要前进后退按钮
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev"
      });
    });

    
  },
  methods:{
    async getAlbumNewest(){
      let {data: result} = await this.$store.dispatch('home/getAlbumNewest');
      // console.log(result);
      result.albums.map((item, index) => {
        let obj = {
          'songId': item.id,
          'songName': item.name,
          'picUrl': item.picUrl,
          'name': item.artist.name,
          'id': item.artist.id
        }
        this.songArr.push(obj);
      });
      // console.log(this.songArr);
      
    }
  }
}
</script>

<style scoped lang='scss'>
.new {
  width: 100%;
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
  .ban {
    width: 100%;
    height: 188px;
    padding: 30px 28px 0 28px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    box-sizing: border-box;
    .swiper-container {
      width: 100%;
      height: 100%;
      .swiper-wrapper {
        width: 100%;
        height: 100%;
        .swiper-slide {
          width: 100%;
          height: 100%;
          .rowItems {
            width: 100%;
            height: 100%;
            .rowItem {
              width: 118px;
              height: 150px;
              float: left;
              position: relative;
              margin-left: 8px;
              .img {
                width: 100px;
                height: 100px;
              }
              .mask {
                width: 100px;
                height: 100px;
                position: absolute;
                top: 0px;
                right: -82px;
                background: url(../../../../assets/zy_coverall.png) no-repeat -100px -574px;
              }
              .tit {
                color: #222;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                margin-top: 4px;
                text-overflow: ellipsis;
              }
              .nam {
                a {
                  color: #aaa;
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.swiper-button-next, .swiper-button-prev {  
  top: 50%;
  transform: translateY(-50%);
}

</style>