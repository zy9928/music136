<template>
  <div class="playCtrl">
    <!-- 音频文件 -->
    <div class="audioBox">
      <audio controls ref="audio" :src="songUrl"></audio>
    </div>
    <!-- 暂停播放上下曲 -->
    <div class="Last_P_Next_btnsBox">
      <span class="lastBtn" @click="playNextLast(-1)"></span>
      <span class="BBtn" :class="{PBtn: isPlay}" @click="BPClc"></span>
      <span class="nextBtn" @click="playNextLast(1)"></span>
    </div>
    <!-- 专辑图 -->
    <div class="albumImgBox">
      <img :src="songInfo.albumImg" :alt="songInfo.songName" />
      <router-link :to="`/play/${id}`"></router-link>
    </div>
    <!-- 歌名歌手进度条 -->
    <div class="progressBarBox">
      <h6 class="songTitle">
        <router-link :to="`/play/${id}`" class="songName">{{songInfo.songName}}</router-link>
        <router-link
          v-for="(item, key) in songInfo.singer"
          :key="key"
          :to="`/singer/${item.singerId}`"
          class="singerName"
        >{{item.singerName}}</router-link>
      </h6>
      <p class="porgressBar" ref="porgress" @mousedown="handleProgressClc">
        <span class="playNowTime" ref="ctrlBtn"></span>
      </p>
    </div>
    <!-- 播放时间 -->
    <p class="songTimeBox">
      <span>{{timeNow}}</span>
      <span>/ {{allTime}}</span>
    </p>
    <!-- 收藏和分享 -->
    <div class="shareAndLike">
      <span class="likeBox" @click="likeBoxClc"></span>
      <span class="shareBox" @click="shareBoxClc"></span>
    </div>
    <!-- 其他控件 -->
    <div class="anotherCtrlBtn">
      <!-- hasVolume 有声 noVolume 静音 -->
      <span class="volumeBtn hasVolume" :class="{noVolume: isNoVolume}" @click="volumeBtnClc"></span>
      <div class="volumeCtrlBox" v-show="isVolumeCtrlBoxShow">
        <div class="volumeCtrlWarp" ref="volumeCtrlWarp" @mousedown="volumeVuleMouseDown">
          <p class="volumeVule" ref="volumeVule">
            <span class="volumeNow" ref="volumeNow"></span>
          </p>
        </div>
      </div>
      <!-- randon 随机播放 loop 循环播放 onlyOne 单曲循环 -->
      <span
        class="loopModeBtn"
        :class="{loop: playerSetting.loopMode == 0, randon: playerSetting.loopMode == 1, onlyOne: playerSetting.loopMode == 2}"
        @click="loopModeClc"
      ></span>
      <div class="loopModeShowBox" v-show="isloopModeShowBox">{{loopModeShow}}</div>
      <span class="songListBtn" @click="songListBtnClc">{{this.playList.length}}</span>
    </div>
  </div>
</template>

<script>
import { getSongUrl, getSongInfo } from "./../../../services/playServe";
import { progressCtrl, progressClc, ctrlBtnClc } from "./../util/progressCtrl";
import { handleLoopMode } from "./../util/anotherUtil.js";
import { volumeShow, volumeMove } from "./../util/volumeCtrl";
import { transforTime } from "./../../../utils/util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      songType: "",
      songUrl: null,
      isPlay: false,
      songInfo: {},
      timeNow: "00:00",
      isNoVolume: false,
      isVolumeCtrlBoxShow: false,
      isloopModeShowBox: false,
      loopModeShowTimer: null,
      // playerSetting: {},
      id: ""
    };
  },
  computed: {
    allTime() {
      var time = transforTime(this.songInfo.duration);
      return time.indexOf("NaN") == -1 ? time : "00:00";
    },
    // id(){
    //   return this.playList[this.playerSetting.index].id;
    // },
    loopModeShow() {
      switch (this.playerSetting.loopMode) {
        case 0:
          return "循环";
        case 1:
          return "随机";
        case 2:
          return "单曲循环";
      }
    },
    ...mapState({
      playList: state => state.playBar.playList,
      isPlayListShow: state => state.playBar.isPlayListShow,
      playerSetting: state => state.playBar.playerSetting
    })
  },
  watch: {
    async "playerSetting.index"(newVal, oldVal) {
      if (this.playList.length != 0) {
        this.id = this.playList[newVal].id;
        await this.handleGetSongInfo(this.id);
        await this.handleGetSongUrl(this.id);
        this.$refs.audio.play();
        var _this = this;
        this.handleProgress(
          this.$refs.audio,
          this.$refs.ctrlBtn,
          this.$refs.porgress,
          _this
        );
        this.isPlay = true;
      }
    }
  },
  methods: {
    // 上一曲/下一曲
    playNextLast(kind) {
      var obj = { ...this.playerSetting };
      if (kind == -1) {
        if (this.playerSetting.index <= 0) {
          obj.index = this.playList.length - 1;
        } else {
          obj.index = obj.index - 1;
        }
      } else if (kind == 1) {
        if (this.playerSetting.index >= this.playList.length - 1) {
          obj.index = 0;
        } else {
          obj.index = obj.index + 1;
        }
      }
      this.$store.commit("playBar/setPlayerSetting", obj);
    },
    // 获取歌曲路径
    async handleGetSongUrl(value) {
      const result = await getSongUrl(value);
      this.songUrl = result.url;
    },
    // 获取歌曲信息
    async handleGetSongInfo(value) {
      const result = await getSongInfo(value);
      this.songInfo = result;
    },
    // 播放暂停
    BPClc() {
      /* 需要做个没有歌曲的拦截 */
      if (!this.songUrl) {
        return;
      }
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        var _this = this;
        this.handleProgress(
          this.$refs.audio,
          this.$refs.ctrlBtn,
          this.$refs.porgress,
          _this
        );
        this.isPlay = true;
      } else {
        this.$refs.audio.pause();
        this.isPlay = false;
      }
    },
    // 进度条随时间变化
    handleProgress(audio, ctrlBtn, porgress, _this) {
      progressCtrl(audio, ctrlBtn, porgress, _this);
    },
    // 点击进度条/拖拽控制按钮变化时间
    handleProgressClc(e) {
      var _this = this;
      progressClc(
        e,
        this.$refs.ctrlBtn,
        this.$refs.porgress,
        this.$refs.audio,
        _this
      );
      this.handleProgress(
        this.$refs.audio,
        this.$refs.ctrlBtn,
        this.$refs.porgress,
        _this
      );
    },
    // 收藏点击
    likeBoxClc() {
      if (!this.$store.state.user.isLogin) {
        this.$center.$emit("openWindow", true);
      } else {
        console.log("收藏了");
      }
    },
    // 分享点击
    shareBoxClc() {
      if (!this.$store.state.user.isLogin) {
        this.$center.$emit("openWindow", true);
      } else {
        console.log("分享了");
      }
    },
    // 处理循环模式
    loopModeClc() {
      this.isloopModeShowBox = true;
      var obj = this.playerSetting;
      if (obj.loopMode >= 2) {
        obj.loopMode = 0;
      } else {
        obj.loopMode++;
      }
      // handleLoopMode(obj, this.$refs.audio, this.playList);
      this.$store.commit("playBar/setPlayerSetting", obj);
      clearTimeout(this.loopModeShowTimer);
      this.loopModeShowTimer = setTimeout(() => {
        this.isloopModeShowBox = false;
      }, 2000);
    },
    // 处理声音
    volumeBtnClc() {
      this.isVolumeCtrlBoxShow = !this.isVolumeCtrlBoxShow;
    },
    volumeVuleMouseDown(e) {
      var _this = this;
      volumeMove(
        e,
        this.$refs.audio,
        this.$refs.volumeVule,
        this.$refs.volumeCtrlWarp,
        _this
      );
    },
    // 处理播放列表显示
    songListBtnClc() {
      this.$store.commit("playBar/setIsPlayListShow", !this.isPlayListShow);
    }
  },
  mounted() {
    // this.playerSetting = this.$store.state.playBar.playerSetting;
    // 获取歌曲路径
    if (this.playList.length != 0) {
      this.id = this.playList[this.playerSetting.index].id;
    }
    this.handleGetSongUrl(this.id);
    // 获取歌曲信息
    this.handleGetSongInfo(this.id);
    // 获取当前音量
    var _this = this;
    volumeShow(this.$refs.audio, this.$refs.volumeVule, _this);
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
  .progressBarBox {
    width: 495px;
    height: 47px;
    float: left;
    padding-top: 7px;
    padding-left: 8px;
    box-sizing: border-box;
    .songTitle {
      line-height: 14px;
      font-size: 12px;
      a:hover {
        text-decoration: underLine;
      }
      .songName {
        color: #dedede;
        margin-right: 15px;
      }
      .singerName {
        color: #9b9b9b;
      }
    }
    .porgressBar {
      width: 486px;
      height: 9px;
      background-color: #191919;
      border-radius: 5px;
      position: relative;
      margin-top: 7px;
      box-sizing: border-box;
      border-bottom: 1px solid #3a3a3a;
      border-top: 1px solid #0b0b0b;
      .playNowTime {
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
        background-color: #b9180f;
        border: 4px solid #f3f3f3;
        &:hover {
          box-shadow: 0 0 5px #fff;
        }
      }
    }
  }
  .songTimeBox {
    float: left;
    padding: 22px 14px 0;
    height: 47px;
    color: #9a9a9a;
    box-sizing: border-box;
    & > span:nth-of-type(2) {
      color: #797979;
    }
  }
  .shareAndLike {
    float: left;
    padding: 0 10px;
    height: 47px;
    display: flex;
    align-items: center;
    & > span {
      display: inline-block;
      margin: 0 4px;
      width: 20px;
      height: 20px;
      background-image: url(./../../../assets/playbar.png);
      background-repeat: no-repeat;
    }
    .likeBox {
      background-position: -91px -165px;
      &:hover {
        background-position: -91px -191px;
      }
    }
    .shareBox {
      background-position: -117px -165px;
      &:hover {
        background-position: -117px -191px;
      }
    }
  }
  .anotherCtrlBtn {
    width: 124px;
    height: 47px;
    float: left;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: url(./../../../assets/playbar.png) no-repeat -149px -236px;
    padding-left: 11px;
    position: relative;
    & > span {
      display: block;
      width: 20px;
      height: 20px;
      background-image: url(./../../../assets/playbar.png);
      background-repeat: no-repeat;
    }
    .volumeBtn,
    .loopModeBtn {
      margin: 0 3px;
    }
    .hasVolume {
      background-position: -5px -250px;
      &:hover {
        background-position: -34px -250px;
      }
    }
    .noVolume {
      background-position: -111px -71px;
      &:hover {
        background-position: -133px -71px;
      }
    }
    .volumeCtrlBox {
      position: absolute;
      height: 113px;
      width: 32px;
      top: -113px;
      left: 7px;
      background: url(./../../../assets/playbar.png) no-repeat 0 -503px;
      .volumeCtrlWarp {
        width: 4px;
        position: absolute;
        bottom: 10px;
        top: 10px;
        border-radius: 2px;
        left: 14px;
        .volumeVule {
          width: 4px;
          position: absolute;
          bottom: 0px;
          top: 0px;
          border-radius: 2px;
          // 最大高度92px; top最小值：102px 最大值10px
          background: url(./../../../assets/playbar.png) no-repeat -40px -522px;
        }
        .volumeNow {
          position: absolute;
          left: 50%;
          margin-left: -6px;
          top: -6px; /* 是声音条top-6 */
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-sizing: border-box;
          background-color: #b9180f;
          border: 3px solid #f5f5f5;
          &:hover {
            box-shadow: 0 0 5px #fff;
          }
        }
      }
    }
    .randon {
      background-position: -69px -250px;
      &:hover {
        background-position: -96px -250px;
      }
    }
    .loop {
      background-position: -6px -346px;
      &:hover {
        background-position: -36px -346px;
      }
    }
    .loopModeShowBox {
      position: absolute;
      width: 80px;
      height: 36px;
      top: -36px;
      text-align: center;
      color: #ffffff;
      line-height: 32px;
      background: url(./../../../assets/playbar.png) no-repeat -1px -457px;
    }
    .onlyOne {
      background-position: -69px -346px;
      &:hover {
        background-position: -96px -346px;
      }
    }
    .songListBtn {
      margin-left: 5px;
      width: 55px;
      height: 24px;
      box-sizing: border-box;
      line-height: 24px;
      text-align: right;
      padding-right: 15px;
      color: #646464;
      background-position: -45px -69px;
      &:hover {
        background-position: -45px -99px;
      }
    }
  }
}
</style>