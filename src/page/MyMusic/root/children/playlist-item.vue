<template>
  <div class="playlist-item" @click="handleTab" @mouseenter="showOpaAction()" @mouseleave="hideOpa()">
    <div class="img">
      <img :src="coverImgUrl" alt />
    </div>
    <div class="text">
      <span>{{name}}</span>
      <p>{{trackCount}}首</p>
      <div class="opa" v-if="index!=0&&showOpa">
        <a href="#">
          <span class="iconfont iconcc-edit"></span>
        </a>
        <a href="#" v-if="isMine">
          <span class="iconfont iconcc-delete"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlist-item",
  data() {
    return {
      showOpa: false
    };
  },
  props: {
    name: String,
    coverImgUrl: String,
    trackCount: Number,
    isMine: Boolean, //是否是自己创建的歌单
    index: Number
  },
  methods: {
    handleTab() {
      this.$emit("click");
    },
    showOpaAction() {
      this.showOpa = true;
    },
    hideOpa() {
      this.showOpa = false;
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  background: #e6e6e6;
}
.playlist-item {
  padding: 9px 10px 6px 19px;
  height: 45px;
  overflow: hidden;
  cursor: pointer;
  .img {
    float: left;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .text {
    float: left;

    margin-left: 11px;
    width: 156px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;
    span {
    }
    p {
      color: #999;
      margin-top: 6px;
    }
    .opa {
      position: absolute;
      right: 8px;
      bottom: 0;
      .iconfont {
        font-size: 14px;
        color: #999;
      }
      a {
        margin-left: 5px;
      }
    }
  }
}
</style>