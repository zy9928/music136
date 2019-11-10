<template>
  <div class="playlist-item">
    <div class="img">
      <img :src="coverImgUrl" alt />
    </div>
    <div class="text">
      <span>{{name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlist-item",
  props: {
    name: String,
    coverImgUrl: String
  }
};
</script>

<style scoped lang="scss">
.playlist-item {
  padding: 9px 10px 6px 23px;
  height: 45px;
  cursor: pointer;
  .img {
    float: left;
    img {
      width: 44px;
      height: 44px;
    }
  }
  .text{
      float: left;
      margin-left: 12px;
      width: 157px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
}
</style>