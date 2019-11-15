<template>
  <div
    class="playBar"
    :class="{playBarShow: isPlayShow}"
    @mouseenter="playBarEnterActive"
    @mouseleave="playBarLeaveActive"
  >
    <div class="playBgLeft"></div>
    <div class="showPlayCtrl">
      <span :class="{CloseLock: isLockClose}" @click="lockActive"></span>
    </div>
    <playCtrl/>
    <playListBox v-show="isPlayListShow"/>
  </div>
</template>

<script>
const axios = require("axios");
import {parseLyric} from "./util/anotherUtil";
import playCtrl from './stair/playCtrl.vue';
import playListBox from "./stair/playListBox.vue";
import {mapState} from "vuex"
export default {
  data() {
    return {
      // 控制播放控件是否显示
      isPlayShow: true,
      // 控制是否锁住
      isLockClose: false,
      // 记录鼠标是否在控件内部
      isMouseOn: false,
      list: '',
      leaveTimer : ''
    };
  },
  computed: {
    ...mapState({
      isPlayListShow: state=>state.playBar.isPlayListShow
    })
  },
  components: {
    playCtrl,
    playListBox
  },
  methods: {
    // 锁控制播放控件显示
    lockActive() {
      this.isLockClose = !this.isLockClose;
      localStorage.setItem("isLockClose", this.isLockClose);
      // 若鼠标在控件内，则该点击事件不改变控件显示状态
      if (this.isMouseOn) {
        return;
      }
      this.isPlayShow = this.isLockClose;
    },
    // 鼠标进出控制控件显示
    playBarEnterActive() {
      clearTimeout(this.leaveTimer);
      this.isPlayShow = true;
      this.isMouseOn = true;
    },
    playBarLeaveActive() {
      // 若锁住，则该事件不改变控件显示状态
      if (this.isLockClose) {
        return;
      }
      clearTimeout(this.leaveTimer);
      this.leaveTimer = setTimeout(() => {
        this.isPlayShow = false;
      }, 1000);
      this.isMouseOn = false;
    }
  },
  mounted() {
    // 读取上一次的播放栏显示/隐藏的状态
    if(localStorage.getItem("isLockClose")){
      if(localStorage.getItem("isLockClose") == "false"){
        this.isLockClose = false;
      }else if(localStorage.getItem("isLockClose") == "true"){
        this.isLockClose = true;
      }
    }
    // 页面挂载时显示4秒
    clearTimeout(mountedPlayShow);
    let mountedPlayShow = setTimeout(() => {
      // 若在2秒内鼠标移入，或被锁住，则该计时器不改变播放控件显示状态
      if(this.isMouseOn || this.isLockClose){
        this.isPlayShow = true;
      }else{
        this.isPlayShow = false;
      }
    }, 2000);
  }
};
</script>

<style scoped lang="scss">
.playBar {
  transition: all 0.3s;
  padding-top: 14px;
  height: 50px;
  width: 100%;
  min-width: 1135px;
  position: fixed;
  z-index: 1000;
  bottom: -46px;
  left: 0;
  .playBgLeft {
    background: url(./../../assets/playbar.png) repeat-x 0 -3px;
    margin-right: 67px;
    height: 50px;
  }
  .showPlayCtrl {
    position: absolute;
    right: 0;
    top: 0px;
    width: 67px;
    height: 64px;
    background: url(./../../assets/playbar.png) no-repeat 0 -383px;
    & > span {
      margin-left: 13px;
      display: block;
      width: 24px;
      height: 15px;
      background: url(./../../assets/playbar.png) no-repeat -76px -380px;
      &:hover {
        background: url(./../../assets/playbar.png) no-repeat -76px -400px;
      }
    }
    .CloseLock {
      background: url(./../../assets/playbar.png) no-repeat -97px -380px;
      &:hover {
        background: url(./../../assets/playbar.png) no-repeat -97px -400px;
      }
    }
  }
}
.playBarShow {
  bottom: 0;
}
</style>