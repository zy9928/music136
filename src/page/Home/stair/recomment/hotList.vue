<template>
  <div class="hotList">
    <div class="top" v-show='show'>
      <div class="leftCo">
        <i class="circle el-icon-s-help"></i>
        <h3 class="hotTit">热门推荐</h3>
      </div>
       
      <ul class="navItems">
        <li class="navItem">华语</li>  |
        <li class="navItem">流行</li>  |
        <li class="navItem">摇滚</li>  |
        <li class="navItem">民谣</li>  |
        <li class="navItem">电子</li> 
      </ul>
     <span class="more">
        <a href="#" class="linkMore">更多</a>
        <a class='right el-icon-right'></a>
      </span>
    </div>
    <p class="line" v-show='show'></p>
    <div class="imgCons">
      <router-link class="imgCon" v-for='(item,index) in this.recommendArr' :key='index' :to='`/songList/${item.id}`'>
        <div class="imgs">
          <img :src="item.picUrl" alt="" class="img">
          <p class="bot">
            <i class="s music el-icon-service"></i>
            <span class=" s num">{{item.playCount}}</span>
            <i class="s play el-icon-video-play"></i>
          </p>
        </div>
        <h4 class="pra">{{item.name}}</h4>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    // id
  },
  data(){
    return {
      recommendArr: [],
      show: false
    }
  },
  methods:{
    async getRecommentData(){
      let {data: result} = await this.$store.dispatch('home/getRecommendResource');
      result.recommend.map(item => {
        let recommendObj = {
          'id': item.id,
          'name': item.name,
          'picUrl': item.picUrl,
          'playCount': item.playcount
        }
        recommendObj.playCount = parseInt(recommendObj.playCount/10000) + '万';
        this.recommendArr.push(recommendObj);
        this.show = true;
      })
      // console.log(this.recommendArr);
      
    }
  },
  mounted(){
    this.getRecommentData();
  }
}
</script>

<style scoped lang='scss'>
.hotList {
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
    .navItems {
      flex: 1;
      display:flex;
      line-height: 36px;
      .navItem {
        color: #555;
        font-size: 12px;
        padding: 0 10px;
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
  .imgCons {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    .imgCon {
      width: 140px;
      margin: 0 16px;
      padding: 0 0 30px 0;
      .imgs {
        width: 100%;
        height: 140px;
        position: relative;
        .img {
          width: 100%;
          height: 100%;
        }
        .bot {
          width: 100%;
          height: 26px;
          opacity: 0.5;
          background: #000;
          position: absolute;
          z-index: 0;
          bottom: 0;
          color: #fff;
          .s {
            line-height: 26px;
          }
          .music {
            margin: 0 10px;
          }
          .num {
            margin: 0 10px 0 0;
          }
          .play {
            float: right;
            margin-right: 10px;
          }
        }
      }
      .pra {
        color: #222;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
</style>