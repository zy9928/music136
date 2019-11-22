<template>
  <div>
    <div class="album">
      <ul class="imgItems">
        <li class="imgItem" v-for='(item, key) in arr' :key='key'>
          <div class="imgRow">
            <router-link :to='`/album/${item.id}`' class="aLink">
              <img :src="item.picUrl" alt="专辑图片" class="img">
            </router-link>
            <div class="mask"></div>
          </div>
          <p class="tit"><a href="#">{{item.songTit}}</a></p>
          <p class="time">{{item.pubTime}}</p>
        </li>
      </ul>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text='<上一页'
      next-text='下一页>'
      @current-change='changeAction'
      :total='totalNum'>
    </el-pagination>
  </div>
</template>

<script>
import TimeHandle from '../../../utils/TimeHandle';
import {mapState} from 'vuex';

export default {
  data(){
    return {
      // id: 12085569,
      limit: '',
      offset: '',
      hotAlbums: {},
      allAlbums: [],
      arr: [],
      imgNameObj: {}
    }
  },
  computed: {
    ...mapState({
      singerId: state => state.aside.singerId,
    }),
    id(){
      return this.singerId;
    },
    //处理页数
    totalNum(){
      let num = this.allAlbums.length;
      if(num <= 12){
        return 1*10;
      }else if(num%12 == 0){
        return num/12*10;
      }else if(num % 12){
        return ((num/12))*10;
      }
    },
  },
  //更新页面
  watch: {
    id(newVal, oldVal){
      this.getArtistAlbum();
    }
  },
  mounted(){
    this.getArtistAlbum();
  },
  methods:{
    //请求歌手专辑数据
    async getArtistAlbum(){
      let {data: result} = await this.$store.dispatch('artist50/getArtistAlbum',{id: this.id});
      result.hotAlbums.map(item => {
        //取出歌手的专辑
        this.hotAlbums = {
          'id': item.id,
          'songTit': item.name,
          'pubTime': item.publishTime,
          'picUrl': item.picUrl,
        }
        this.allAlbums.push(this.hotAlbums);
      });
    
          
      //初始页面
      this.arr = this.allAlbums.slice(0,12);
      //处理初始页面的时间
      this.arr.forEach(item=>{
        item.pubTime = TimeHandle.getYMD(item.pubTime);
      })
    },
    //改变分页器
    changeAction(x){
      this.arr = this.allAlbums.slice((x-1)*12, x*12);
      //处理后面页面的时间
       this.arr.forEach(item=>{
        item.pubTime = TimeHandle.getYMD(item.pubTime);
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.album {
  width: 100%;
  padding: 10px 0 50px 0;
  box-sizing: border-box;
  // border: 1px solid #ddd;
  background: #fff; 
  margin-top: 10px;
  overflow: hidden;
  .imgItems {
    width: 100%;
    float: left;
    box-sizing: border-box;
    .imgItem {
      float: left;
      width: 120px;
      height: 205px;
      margin-right: 40px;
      .imgRow {
        width: 120px;
        height: 120px;
        position: relative;
        .aLink {
          width: 120px;
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
.el-pagination {
  padding: 20px 0;
  text-align: center;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #E1151D;
}
</style>