<template>
  <div class="playListHeader">
    <section class="headerLeft">
      <p class="playListSum">播放列表({{playList.length}})</p>
      <div class="playListCtrlBtn">
        <p class="linkAll">
          <i></i>
          <span>收藏全部</span>
        </p>
        <p class="clearAll">
          <i></i>
          <span @click="clearAll">清除</span>
        </p>
      </div>
    </section>
    <div class="songNameBox">
      {{playList.length != 0 && playerSetting.index != null ?playList[playerSetting.index].name : ''}}
      <span @click="closePlayList"></span>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      playList: state=>state.playBar.playList,
      playerSetting: state=>state.playBar.playerSetting
    })
  },
  methods: {
    closePlayList(){
      this.$store.commit("playBar/setIsPlayListShow", false);
    },
    clearAll(){
      this.$store.commit("playBar/setPlayList", []);
      var obj = this.playerSetting;
      obj.index = null;
      this.$store.commit("playBar/setPlayerSetting", obj);
    }
  }
}
</script>

<style scoped lang="scss">
.playListHeader{
  height: 40px;
  width: 100%;
  // background-color: #181818;
  background: #181818 url(./../../../assets/zy_playListHeadFgBg.jpg) no-repeat 552px 0px;
  box-sizing: border-box;
  border: 1px solid #0E0E0E;
  border-radius: 5px 5px 0 0;
  .headerLeft{
    width: 552px;
    height: 38px;
    float: left;
    margin-right: 6px;
    .playListSum{
      padding: 0 27px;
      height: 38px;
      float: left;
      line-height: 38px;
      font-size: 14px;
      color: #E2E2E2;
    }
    .playListCtrlBtn{
      float: right;
      height: 38px;
      display: flex;
      align-items: center;
      &>p{
        padding: 0 9px;
        color: #C1C1C1;
        font-size: 12px;
        height: 15px;
        line-height: 15px;
        position: relative;
        &>span{
          padding-left: 20px;
        }
      }
      @mixin playListCtrlImgHover{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      @mixin playListCtrlBoxHover{
        cursor: pointer;
        &:hover{
          text-decoration: underline;
        }
        &:hover >i{
          background-position-y: -20px;
        }
      }
      .linkAll{
        border-right: 1px solid #000000;
        @include playListCtrlBoxHover;
        &>i{
          width: 16px;
          height: 15px;
          @include playListCtrlImgHover;
          background: url(./../../../assets/zy_playlist.png) no-repeat -24px 0;
        }
      }
      .clearAll{
        border-left: 1px solid #2C2C2C;
        @include playListCtrlBoxHover;
        &>i{
          width: 13px;
          height: 15px;
          @include playListCtrlImgHover;
          background: url(./../../../assets/zy_playlist.png) no-repeat -51px 0;
        }
      }
    }
  }
  .songNameBox{
    width: 422px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    color: #FFFFFF;
    font-size: 14px;
    float: left;
    position: relative;
    &>span{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      background: url(./../../../assets/zy_playlist.png) no-repeat -205px 0;
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>