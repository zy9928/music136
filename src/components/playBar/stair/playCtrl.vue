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
      <router-link :to="`/play/${id}`"></router-link>
    </div>
    <div class="progressBarBox">
      <h6 class="songTitle">
        <router-link :to="`/play/${id}`" class="songName"> {{songInfo.songName}} </router-link>
        <router-link :to="`/singer/${songInfo.singerId}`" class="singerName">{{songInfo.singerName}}</router-link>
      </h6>
      <p class="porgressBar" ref="porgress" @mousedown="handleProgressClc">
        <span class="playNowTime" ref="ctrlBtn" ></span>
      </p>
    </div>
  </div>
</template>

<script>
import { getSongUrl, getSongInfo } from "./../../../services/playServe";
import { progressCtrl, progressClc, ctrlBtnClc } from "./../util/progressCtrl";
export default {
  props: {
    id: '',
  },
  data() {
    return {
      songType: "",
      songUrl: "",
      isPlay: false,
      songInfo: {},
    };
  },
  methods: {
    // 获取歌曲路径
    async handleGetSongUrl() {
      const result = await getSongUrl();
      this.songUrl = result.url;
    },
    // 获取歌曲信息
    async handleGetSongInfo() {
      const result = await getSongInfo();
      this.songInfo = result;
    },
    // 播放暂停
    BPClc() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.handleProgress(this.$refs.audio, this.$refs.ctrlBtn, this.$refs.porgress);
        this.isPlay = true;
      } else {
        this.$refs.audio.pause();
        this.isPlay = false;
      }
    },
    // 进度条随时间变化
    handleProgress(audio, ctrlBtn, porgress) {
      progressCtrl(audio, ctrlBtn, porgress);
    },
    // 点击进度条/拖拽控制按钮变化时间
    handleProgressClc(e){
      var _this = this;
      progressClc(e, this.$refs.ctrlBtn, this.$refs.porgress, this.$refs.audio, _this);
    }
  },
  mounted() {
    // 获取歌曲路径
    this.handleGetSongUrl();
    // 获取歌曲信息
    this.handleGetSongInfo();
  }
};
</script>

<style scoped lang="scss">
.playCtrl {
  position: absolute;
  top: 17px;
  left: 50%;
  // transform: translateX(-50%);
  margin-left: -490px;
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
  .progressBarBox{
    width: 495px;
    height: 47px;
    float: left;
    padding-top: 7px;
    padding-left: 8px;
    box-sizing: border-box;
    .songTitle{
      line-height: 14px;
      font-size: 12px;
      a:hover{
        text-decoration: underLine;
      }
      .songName{
        color: #DEDEDE;
        margin-right: 15px;
      }
      .singerName{
        color: #9B9B9B;
        margin-right: 15px;
      }
    }
    .porgressBar{
      width: 486px;
      height: 9px;
      background-color: #191919;
      border-radius: 5px;
      position: relative;
      margin-top: 7px;
      box-sizing: border-box;
      border-bottom: 1px solid #3A3A3A;
      border-top: 1px solid #0B0B0B;
      .playNowTime{
        border-radius: 50%;
        display: block;
        position: absolute;
        top: 50%;
        left: 0px;
        margin-top: -8px;
        margin-left: -8px;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        background-color: #B9180F;
        border: 4px solid #F3F3F3;
        &:hover{
          box-shadow: 0 0 5px #fff;
        }
      }
    }
  }
}
</style>