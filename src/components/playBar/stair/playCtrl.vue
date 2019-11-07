<template>
  <div class="playCtrl">
    <div class="audioBox">
      <audio controls ref="audioSrc" :src="songUrl"></audio>
    </div>
    <div class="Last_P_Next_btnsBox">
      <span class="lastBtn"></span>
      <span class="BBtn PBtn"></span>
      <span class="nextBtn"></span>
    </div>
  </div>
</template>

<script>
import { getSongUrl, getSongInfo } from "./../../../services/playServe";
export default {
  data() {
    return {
      songType: "",
      songUrl: ""
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
      // console.log(result);
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
}
</style>