<template>
  <div class="playlist-item" @click="handleTab">
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
  },
  methods:{
    handleTab(){
      this.$emit('click');
    }
  }
};
</script>

<style scoped lang="scss">
.active{
  background:#e6e6e6;
}
.playlist-item {
  padding: 9px 10px 6px 19px;
  height: 45px;
  cursor: pointer;
  .img {
    float: left;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .text{
      float: left;
      margin-left: 11px;
      width: 156px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
}
</style>