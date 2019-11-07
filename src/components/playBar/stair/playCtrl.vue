<template>
  <div class="playCtrl">
    <div class="audioBox">
      <audio controls ref="audio" :src="songUrl"></audio>
    </div>
    <div class="Last_P_Next_btnsBox">
      <span class="lastBtn"></span>
      <span class="BBtn" :class="{PBtn: isPlay}" @click="BPClc"></span>
      <span class="nextBtn"></span>
    </div>
    <div class="albumImgBox">
      <img :src="songInfo.albumImg" :alt="songInfo.songName" />
      <router-link to="/play"></router-link>
    </div>
  </div>
</template>

<script>
import { getSongUrl, getSongInfo } from "./../../../services/playServe";
export default {
  data() {
    return {
      songType: "",
      songUrl: "",
      isPlay: false,
      songInfo: {}
    };
  },
  methods: {
    async handleGetSongUrl() {
      const result = await getSongUrl();
      this.songUrl = result.url;
      // console.log(result);
    },
    async handleGetSongInfo() {
      const result = await getSongInfo();
      this.songInfo = result;
      console.log(result);
    },
    BPClc() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.isPlay = true;
      } else {
        this.$refs.audio.pause();
        this.isPlay = false;
      }
    }
  },
  mounted() {
    this.handleGetSongUrl();
    this.handleGetSongInfo();
  }
};
</script>

<style scoped lang="scss">
.playCtrl {
  position: absolute;
  top: 17px;
  left: 50%;
  transform: translateX(-50%);
  width: 980px;
  height: 47px;

  .audioBox {
    display: none;
  }
  .Last_P_Next_btnsBox {
    width: 109px;
    height: 47px;
    display: flex;
    align-items: center;
    float: left;
    & > span {
      flex: 1;
      background-image: url(./../../../assets/playbar.png);
      background-repeat: no-repeat;
      background-position-y: -124px;
      height: 38px;
    }
    .lastBtn {
      background-position-x: 3px;
      &:hover {
        background-position-x: -27px;
      }
    }
    .BBtn {
      flex: none;
      width: 45px;
      // background-position-y: -164px;
      background-position-y: -203px;
      background-position-x: 5px;
      &:hover {
        background-position-x: -35px;
      }
    }
    .nextBtn {
      background-position-x: -77px;
      &:hover {
        background-position-x: -107px;
      }
    }
    .PBtn {
      background-position-y: -164px;
      // background-position-y: -203px;
    }
  }
  .albumImgBox {
    width: 60px;
    height: 47px;
    float: left;
    padding: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: 15px;
    & > a {
      position: absolute;
      display: block;
      width: 34px;
      height: 34px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url(./../../../assets/playbar.png) no-repeat 0 -80px;
    }
    & > img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>