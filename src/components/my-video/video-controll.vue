<template>
  <div class="video-controll">
    <span @click="handlePlay" class="iconfont iconcc-play video-controll-play"></span>
    <span class="currentTime">{{ctFormat}}</span>
    <div class="video-controll-progress">
      <draw-line :width="307" :moveRate="processRate" :duration="duration"></draw-line>
    </div>
    <span class="allTime">{{dtFormat}}</span>
    <span class="iconfont iconcc-audio video-controll-audio"></span>
  </div>
</template>

<script>
import TimeHandel from "../../utils/TimeHandle";
export default {
  name: "video-control",
  components: {
    "draw-line": () => import("./draw-line")
  },
  methods:{
   handlePlay(){
      this.$emit('videoPlayAction');
    }
  },
  props:{
    currentTime:{
      type:Number,
      default:0
    },
    duration:{
      type:Number,
      default:0
    }
  },
  computed:{
    ctFormat(){
      return TimeHandel.getMS(this.currentTime);
    },
    dtFormat(){
      return TimeHandel.getMS(this.duration);
    },
    //进度条走动比比例
    processRate(){
        return (this.currentTime/this.duration);
    }
  }
};
</script>

<style scoped lang="scss">
  .video-controll{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 42px;
    line-height: 42px;
    background: rgba(0,0,0,.5);
    span{
      float: left;
      color: #ddd;
    }
   .video-controll-play{
      color: #fff;
      cursor: pointer;
      float: left;
      &:hover{
        color: #ddd;
      }
    }
    .iconfont{
      font-size: 24px;
      margin: 0 6px;
    }
    &-progress{
      float: left;
      margin:20px 20px 0;
    }
  }
</style>