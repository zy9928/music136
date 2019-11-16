<template>
  <div class="playListContBox">
    <playListLeft/>
    <playListRight/>
  </div>
</template>

<script>
import playListRight from './../third/playListRight';
import playListLeft from './../third/playListLeft';
export default {
  components: {
    playListLeft,
    playListRight
  }
}
</script>

<style scoped lang="scss">
.playListContBox{
  width: 982px;
  height: 260px;
  border-top: 1px solid #1C1C1C;
}
</style>