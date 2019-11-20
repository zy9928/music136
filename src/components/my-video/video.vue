<template>
  <div class="my-video" name="media">
    <video controls :src="videoSrc" autoplay :width="width" :height="height">
      <source  type="video/mp4" />
    </video>
    <video-controll></video-controll>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoSrc: ""
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
    }
  },
  name: "my-video",
  created() {
    this.getVideo()
      .then(urls => {
          console.log(urls);
        this.videoSrc = urls[0].url;
      })
      .catch(err => {
        console.log(err);
        // alert("视频获取失败");
      });
  },
  methods: {
    async getVideo() {
      try {
        let result = await this.$store.dispatch(
          "video/getVideo",
          this.videoId
        );
        return result.data.urls;
      } catch (error) {
        return error;
      }
    }
  }
};
</script>

<style>
</style>