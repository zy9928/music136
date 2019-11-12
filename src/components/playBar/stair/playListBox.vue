<template>
  <div class="playListBox">
    <playListHeader/>
    播放列表
  </div>
</template>

<script>
import playListHeader from './../secend/playListHeader.vue';
export default {
  components: {
    playListHeader
  },
  data(){
    return{
      isPlayListShow: false
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
  
}
</style>