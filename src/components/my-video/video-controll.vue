<template>
  <div class="video-controll">
    <span
      @click="handlePlay"
      class="iconfont iconcc-play video-controll-play"
      :class="{'iconcc-pause':isPlay}"
    ></span>
    <span class="currentTime">{{ctFormat}}</span>
    <div class="video-controll-progress">
      <draw-line :width="307" :moveRate="processRate" :duration="duration"></draw-line>
    </div>
    <span class="allTime">{{dtFormat}}</span>
    <div class="video-controll-audio" @mouseenter="showSound=true" @mouseleave="showSound=false">
      <span @click="soundControll" class="iconfont iconcc-audio" :class="{'iconcc-silence':isSilience}"></span>
      <div class="audio-draw-line" v-show="showSound">
        <draw-line :isMuted="isMuted" :volume="volume" :dotSize="12" model="1" :height="60" :width="4" class></draw-line>
      </div>
    </div>
    <span class="changeRes">标清</span>
    <span class="iconfont iconcc-allscreen video-controll-all"></span>
  </div>
</template>

<script>
import TimeHandel from "../../utils/TimeHandle";
export default {
  name: "video-control",
  components: {
    "draw-line": () => import("./draw-line")
  },
  methods: {
    handlePlay() {
      this.$emit("videoPlayAction");
    },
    soundControll(){
      this.$center.$emit('mutedAction');
      this.$center.$emit("soundSilence");
      
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    isPlay: {
      type: Boolean,
      required: true
    },
    volume: {
      type: Number,
      default: 1
    },
    isMuted:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    ctFormat() {
      return TimeHandel.getMS(this.currentTime);
    },
    dtFormat() {
      return TimeHandel.getMS(this.duration);
    },
    //进度条走动比比例
    processRate() {
      return this.currentTime / this.duration;
    }
  },
  watch: {
    volume() {
      if (this.volume == 0) {
        this.isSilience = true;
      } else {
        this.isSilience = false;
      }
    },
    isMuted(){
      this.isSilience = this.isMuted;
    }
  },
  data() {
    return {
      showSound: false,
      isSilience: false
    };
  }
};
</script>

<style scoped lang="scss">
.video-controll {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 42px;
  line-height: 42px;
  background: rgba(0, 0, 0, 0.5);
  span {
    float: left;
    color: #ddd;
  }
  .video-controll-play {
    color: #fff;
    cursor: pointer;
    float: left;
    &:hover {
      color: #ddd;
    }
  }
  .iconfont {
    font-size: 24px;
    margin: 0 6px;
  }
  .video-controll-audio {
    position: relative;
    float: left;
    .audio-draw-line {
      position: absolute;
      // width: 24px;
      padding: 8px 10px;
      left: 2px;
      bottom: 40px;
      background: rgba(0, 0, 0, 0.7);
    }
    .iconfont {
      font-size: 16px;
      cursor: pointer;
      color: #fff;
      &:hover {
        color: #ddd;
      }
    }
  }
  .changeRes {
    cursor: pointer;
    padding: 0 5px;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;
    line-height: 16px;
    margin-top: 12px;
    color: #fff;
    &:hover {
      color: #ddd;
    }
  }
  .video-controll-all.iconfont {
    font-size: 16px;
    margin-left: 10px;
    color: #fff;
    cursor: pointer;
    &:hover {
      color: #ddd;
    }
  }

  &-progress {
    float: left;
    margin: 20px 20px 0;
  }
}
</style>