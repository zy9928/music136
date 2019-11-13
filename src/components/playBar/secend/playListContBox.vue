<template>
  <div class="playListContBox">
    <playListLeft/>
  </div>
</template>

<script>
import playListLeft from './../third/playListLeft';
export default {
  components: {
    playListLeft
  }
}
</script>

<style scoped lang="scss">
.playListContBox{
  width: 980px;
  height: 260px;
  border-top: 1px solid #1C1C1C;
}
</style>