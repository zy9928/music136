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
    playListData(){
      this.handleGetSongInfo(this.playNowId);
      var playListData = [...playList];
      if(playListData.length == 0){

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