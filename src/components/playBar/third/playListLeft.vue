<template>
  <div class="playListLift">
    <button class="text" @click="text">测试</button>
    {{playNowId}}
  </div>
</template>

<script>
import {getSongInfo} from './../../../services/playServe.js';
import {mapState} from 'vuex';
var textIndex = 0;
let playListMiddle = [];
let playerSettingMiddle = {};
export default {
  data(){
    return {
      textData: [346013, 64153, 1337934765, 167640, 187813],
      songInfo: {}
    }
  },
  computed: {
    ...mapState({
      playNowId: state=>state.playBar.playNowId,
      playList: state=>state.playBar.playList,
      playerSetting: state=>state.playBar.playerSetting
    }),
  },
  watch: {
    async playNowId(newVal, oldVal){
      if(newVal){
        // 请求当前请求的音乐信息
        await this.handleGetSongInfo(this.playNowId);
        // 将store中的值赋值出来（因为不能直接更改）
        playListMiddle = [...this.playList];
        playerSettingMiddle = {...this.playerSetting};
        // 如果歌单为空，直接添加
        if(this.playList.length == 0){
          playListMiddle.push(this.songInfo);
          playerSettingMiddle.index = 0;
          this.$store.commit("playBar/setPlayList", playListMiddle);
          this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
        }else{
          // 若歌单不为空，查找当前请求ID是否在歌单中拥有
          var found = playListMiddle.find(info=>{
            return info.id == newVal;
          })
          if(!found){
            // 不拥有，添加进歌单，
            playListMiddle.push(this.songInfo);
            this.$store.commit("playBar/setPlayList", playListMiddle);
            playerSettingMiddle.index = playListMiddle.length - 1;
            this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
          }else{
            // 拥有，更新播放歌曲index
            var index = playListMiddle.indexOf(found);
            playerSettingMiddle.index = index;
            this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
          }
        }
      }
    }
  },
  methods: {
    text(){
      if(textIndex >= 5){
        textIndex = 0;
      }
      this.$store.commit("playBar/setPlayNowId", this.textData[textIndex]);
      textIndex ++;
    },
    async handleGetSongInfo(value) {
      const result = await getSongInfo(value);
      this.songInfo = result.songInfoAll;
    },
  }
}
</script>

<style scoped lang="scss">
.playListLift{
  width: 552px;
  height: 260px;
  float: left;
  border-right: 6px solid #0F0B0B;
}
</style>