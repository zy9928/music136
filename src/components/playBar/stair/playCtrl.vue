<template>
  <div class="playCtrl">
    <div class="audioBox">
      <audio controls ref="audioSrc" :src="songUrl"></audio>
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
      // console.log(result);
    },
    async handleGetSongInfo(){
      const result = await getSongInfo();
      console.log(result);
    },
  },
  mounted(){
    this.handleGetSongUrl();
    this.handleGetSongInfo();
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