<template>
  <div class="my-video" :style="{width:width+'px',height:height+'px'}" name="media">
    <video ref="video" :src="videoSrc" :width="width" :height="height">
      <source type="video/mp4" :src="videoSrc" />
    </video>
    <video-controll :currentTime="currentTime" :duration="duration" @videoPlayAction="handlePlay"></video-controll>
    <div class="big-btn">
      <span @click="playVideo" v-show="!isPlay" class="iconfont iconcc-play"></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: "",
      isPlay: true,
      video: {},
      changeRate: 0,
      currentTime: 0,
      duration: 0
    };
  },
  components: {
    "video-controll": () => import("./video-controll")
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    videoId: {
      //视频id
      type: String,
      required: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  name: "my-video",
  computed: {},
  watch: {},
  created() {
    
    //监听进度条改变（拖拽),设置当前时间
    this.$center.$on('progresschange',rate=>{
      this.currentTime = this.duration*rate;
      this.video.currentTime = this.currentTime/1000;
    })

    this.getVideo()
      .then(urls => {
        console.log(urls);
        this.videoSrc = urls[0].url;
        //加载到资源播放视频
        this.$nextTick(() => {
          if (this.autoPlay) {
            this.playVideo();
          }
        });
      })
      .catch(err => {
        console.log(err);
        // alert("视频获取失败");
      });
  },
  mounted() {
    this.video = this.$refs.video;
    this.video.oncanplay = () => {
      this.duration = parseInt(this.video.duration * 1000);
    };
    this.timeChangeListen();
  },
  methods: {
    async getVideo() {
      try {
        let result = await this.$store.dispatch("video/getVideo", this.videoId);
        return result.data.urls;
      } catch (error) {
        return error;
      }
    },
    playVideo() {
      //播放视频
      this.video.play();
      this.isPlay = true;
    },
    pauseVideo() {
      this.video.pause();
      this.isPlay = false;
    },
    handlePlay() {
      if (this.isPlay) {
        this.pauseVideo();
      } else {
        this.playVideo();
      }
    },
    timeChangeListen() {
      this.video.ontimeupdate = () => {
        this.currentTime = parseInt(this.video.currentTime * 1000);
      };
    }
  }
};
</script>

<style scoped lang="scss">
.my-video {
  position: relative;
  user-select: none;
  .big-btn {
    width: 74px;
    height: 74px;
    text-align: center;
    line-height: 74px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    span {
      color: #ddd;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .iconfont {
      font-size: 60px;
    }
  }
}
</style>