<template>
  <div class="playListBox">
    <playListHeader/>
    <playListContBox/>
  </div>
</template>

<script>
import playListHeader from './../secend/playListHeader.vue';
import playListContBox from './../secend/playListContBox';
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