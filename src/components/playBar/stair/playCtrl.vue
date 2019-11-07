<template>
  <div class="playCtrl">
    <div class="audioBox">
      <audio controls>
          <source src="http://m8.music.126.net/20191107104205/deef85adc34fd5be3e0b6901e019b7e6/ymusic/f942/5918/b86d/7e035cffc2b159636df5e0461a862d49.mp3" /> 
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
      console.log(result);
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