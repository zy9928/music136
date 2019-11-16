<template>
  <ul class="playListUl">
    <li
      class="playListLi"
      v-for="(songLi, key) in playList"
      :key="key"
      :class="{playListLiActive: key == playerSetting.index}"
      @click="playThisSong(key)"
    >
      <span class="isPlay" v-show="key == playerSetting.index"></span>
      <span class="songName">{{songLi.name}}</span>
      <p class="songListCtrl">
        <span class="linkBtn"></span>
        <span class="shareBtn"></span>
        <span class="downBtn"></span>
        <span class="deleteBtn" @click.stop="deleteBtn(key)"></span>
      </p>
      <p class="singerBox">
        <router-link
          v-for="(singer, key) in singers[key]"
          :key="key"
          :to="`/singer/${singer.id}`"
          class="singerName"
        >{{singer.name}}</router-link>
      </p>
      <span class="songLong"> {{handleTime(songLi.dt)}} </span>
    </li>
  </ul>
</template>

<script>
import { transforTime } from './../../../utils/util.js';
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      playList: state => state.playBar.playList,
      playerSetting: state => state.playBar.playerSetting
    }),
    singers() {
      // var arr = this.playList[this.playerSetting.index].ar;
      var singer = [];
      this.playList.forEach(song=>{
        var arr = [];
        song.ar.forEach(({ name, id }, index) => {
          if (index < song.ar.length - 1) {
            arr.push({
              id,
              name: name + "/"
            });
          } else if (index >= song.ar.length - 1) {
            arr.push({
              id,
              name
            });
          }
        });
        singer.push(arr);
      })
      return singer;
    },
  },
  methods: {
    handleTime(value){
      return transforTime(value);
    },
    playThisSong(key){
      var obj = {...this.playerSetting};
      obj.index = key;
      this.$store.commit('playBar/setPlayerSetting', obj);
    },
    deleteBtn(key){
      var arr = [...this.playList];
      arr.splice(key, 1);
      this.$store.commit('playBar/setPlayList', arr);
      var obj = {...this.playerSetting};
      if(this.playerSetting.index >key){
        obj.index = obj.index - 1;
      }else if(this.playerSetting.index == key){
        if(key == this.playList.length){
          obj.index = 0;
        }else{
          obj.index = obj.index;
        }
      }else if(this.playerSetting.index < key){
        obj.index = obj.index;
      }
      if(this.playList.length == 0){
        obj.index = null;
      }
      this.$store.commit("playBar/setPlayerSetting", obj);
    }
  }
};
</script>

<style scoped lang="scss">
.playListUl {
  color: #cccccc;
  font-size: 12px;
  @mixin textHid {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .playListLi {
    width: 100%;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    padding-left: 29px;
    position: relative;
    &:hover {
      background-color: #171615;
      color: #ffffff;
    }
    &:hover .songListCtrl {
      visibility: visible;
    }
    &:hover .singerBox a{
      color: #fff;
    }
    .isPlay {
      width: 10px;
      height: 10px;
      background: url(./../../../assets/zy_playlist.png) no-repeat -182px -1px;
      position: absolute;
      top: 50%;
      margin-top: -5px;
      left: 10px;
    }
    .songName {
      display: inline-block;
      height: 12px;
      line-height: 12px;
      vertical-align: middle;
      width: 216px;
      @include textHid;
    }
    .songListCtrl {
      visibility: hidden;
      display: inline-block;
      height: 28px;
      vertical-align: middle;
      line-height: 28px;
      & > span {
        display: inline-block;
        width: 17px;
        height: 16px;
        margin: 0 5px;
        vertical-align: middle;
      }
      .linkBtn {
        background: url(./../../../assets/zy_playlist.png) no-repeat -24px 0;
        &:hover {
          background: url(./../../../assets/zy_playlist.png) no-repeat -24px -20px;
        }
      }
      .shareBtn {
        background: url(./../../../assets/zy_playlist.png) no-repeat 0 0;
        &:hover {
          background: url(./../../../assets/zy_playlist.png) no-repeat 0 -20px;
        }
      }
      .downBtn {
        background: url(./../../../assets/zy_playlist.png) no-repeat -57px -50px;
        &:hover {
          background: url(./../../../assets/zy_playlist.png) no-repeat -80px -50px;
        }
      }
      .deleteBtn {
        background: url(./../../../assets/zy_playlist.png) no-repeat -50px 0;
        &:hover {
          background: url(./../../../assets/zy_playlist.png) no-repeat -50px -20px;
        }
      }
    }
    .singerBox{
      display: inline-block;
      padding-left: 5px;
      width: 80px;
      vertical-align: middle;
      @include textHid;
      &>a{
        color: #ccc;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .songLong{
      padding: 0 50px 0 30px;
      display: inline-block;
      height: 28px;
      line-height: 28px;
      vertical-align: middle;
    }
  }
  .playListLiActive {
    background-color: #181616;
    color: #fff;
    .singerBox a{
      color: #fff;
    }
  }
}
</style>