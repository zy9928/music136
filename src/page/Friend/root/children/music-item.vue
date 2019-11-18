<template>
  <div class="music-item">
    <div class="music-item-main" v-if="listType==1"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    listType: {
      type: String,
      default: "1" //1单曲、10: 专辑, 100: 歌手, 1000: 歌单 1009: 电台
    },
    
  }
};
</script>

<style>
</style>