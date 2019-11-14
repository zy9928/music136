<template>
  <div class="playListBox" :style="playListBoxStyle">
    <playListHeader/>
    <playListContBox/>
  </div>
</template>

<script>
import playListHeader from './../secend/playListHeader.vue';
import playListContBox from './../secend/playListContBox';
import {mapState} from 'vuex';
export default {
  components: {
    playListHeader,
    playListContBox
  },
  data(){
    return{
      isPlayListShow: false
    }
  },
  computed: {
    ...mapState({
      playList: state=>state.playBar.playList,
      playerSetting: state=>state.playBar.playerSetting,
    }),
    bgImg(){
      return this.playList[this.playerSetting.index].al.picUrl;
    },
    playListBoxStyle(){
      return {
        'background-image': `url(${this.bgImg})`
      }
    }
  },
  mounted(){
    this.isPlayListShow = this.$store.state.playBar.isPlayListShow;
  }
}
</script>

<style lang="scss" scoped>
.playListBox{
  position: absolute;
  width: 982px;
  height: 301px;
  top: -284px;
  left: 50%;
  margin-left: -491px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
}
</style>