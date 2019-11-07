<template>
  <div class="playCtrl">
    <div class="audioBox">
      <audio controls ref="audioSrc" :src="songUrl">
          <!-- <source ref='audioSrc' />  -->
      </audio>
      <!-- <video controls name="media">
        <source :src="songUrl" type="audio/mpeg" />
      </video> -->
    </div>
  </div>
</template>

<script>
import {getSongUrl, getSongInfo} from './../../../services/playServe';
export default {
  data(){
    return {
      songType: '',
      songUrl: ''
    }
  },
  methods: {
    async handleGetSongUrl(){
      const result = await getSongUrl();
      this.songUrl = result.url;
      // this.$refs.audioSrc.src = result.url
      console.log(result);
    },
    async handleGetSongInfo(){
      const result = await getSongInfo();
      console.log(result);
    },
  },
  mounted(){
    this.handleGetSongUrl().then(()=>{
      // this.$refs.audioSrc.src = this.songUrl
    });
    this.handleGetSongInfo();
  },
  updated(){
    // this.$refs.audioSrc.src = this.songUrl
  }
}
</script>

<style scoped lang="scss">
.playCtrl{
  position: absolute;
  top: 17px;
  left: 50%;
  transform: translateX(-50%);
  width: 980px;
  height: 47px;
}
.audioBox{
}

</style>