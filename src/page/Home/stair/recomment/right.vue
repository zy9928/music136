<template>
  <div class="right">
    <div class="top">
      <el-button type="primary" icon="el-icon-download" class='icon'>下载客户端</el-button>
    </div>
    <div class="login">
      <p class="text">登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
      <el-button type="danger" class='iconLo'>用户登录</el-button>
    </div>
    <div class="list">
      <div class="topTi">
        <h3 class="hotTit">入驻歌手</h3>
        <span class="more">
          <a href="#" class="linkMore">查看全部</a>
          <a class='right el-icon-right'></a>
        </span>
      </div>
      <p class="line"></p>
      <ul class="listItems">
        <li class="listItem" v-for='(item, index) in arr.slice(0, 5)' :key='index'>
          <img :src="item.picUrl" alt="" class='img'>
          <h4 class="txt4">{{item.name}}{{item.alias}}</h4>
          <p class="pp"></p>
        </li>
      </ul>
      <el-button type="info" class='sen'>申请成为网易音乐人</el-button>
    </div>
   
  </div>
</template>

<script>
export default {
  data(){
    return {
      cat: 5001,
      arr: [],
    }
  },
  mounted(){
    this.getArtistList();
    // this.getTopPopular();
  },
  methods:{
    async getArtistList(){
      let {data: result} = await this.$store.dispatch('home/getArtistList', {'cat': this.cat});
      // console.log(result);
      result.artists.map(item => {
        let obj = {
          'id': item.id,
          'name': item.name,
          'picUrl': item.picUrl,
          'alias': item.alias[0],
          'briefDesc': item.briefDesc
        }
        this.arr.push(obj);
      })
    },

     async getTopPopular(){
      let {data: result} = await this.$store.dispatch('home/getTopPopular');
      // console.log(result);
    }


    
  }
}
</script>

<style scoped lang='scss'>
.right {
  float: left;
  width: 100%;
  height: 100%;
  .top {
    width: 100%;
    height: 285px;
    background: #e4f4f4;
    position: relative;
    .icon {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .login {
    width: 100%;
    height: 126px;
    background: #eee;
    position: relative;
    border-bottom: 1px solid #ddd;
    .text {
      color: #444;
      font-size: 12px;
      padding: 20px;
    }
    .iconLo {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .list {
    padding: 8px;
   
    .listItems {
      width: 100%;
        .listItem {
        width: 100%;
        height: 60px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        background: #e9e9e9;
        margin-bottom: 10px;
        .img {
          width: 60px;
          height: 60px;
          float: left;
          margin-right: 10px;
        }
        .txt4 {
          color: #333;
          font-size: 12px;
          font-weight: 600;
          margin: 10px 0;
        }
        .pp {
          color: #555;
          font-size: 12px;
        }
      }
    }
    .sen {
      width: 100%;
    }
    
}
// }

 .topTi {
  width: 100%;
  height: 30px;
  display: flex;
  box-sizing: border-box;
  .hotTit {
    float: left;
    padding: 5px 8px;
    color: #222;
    font-size: 14px;
    font-weight: 600;
  }
  .more {
    flex: 1;
    line-height: 30px;
    display: inline-flex;
    justify-content: flex-end;
    .linkMore {
      color: #555;
      font-size: 12px;
      padding-right: 5px;
    }
    .right {
      width: auto;
      color: red;
      line-height: 36px;
      font-weight: 600;
    }
  }
}
.line {
  width: 100%;
  height: 1px;
  background: #ddd;
  vertical-align: baseline;
  margin-bottom: 20px;
}

}
</style>
<style lang="scss">


</style>