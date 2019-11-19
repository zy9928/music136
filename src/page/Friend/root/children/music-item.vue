<template>
  <div class="music-item" @click="selectAction()">
    <div class="music-item-left">
      <slot name="left" />
    </div>
    <div class="music-item-title">
        <span class="tag" v-if="item.dj">
            电台
        </span>
        {{item.name}}
        </div>
    <div class="music-item-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data() {
    return {};
  },
  methods:{
      selectAction(){
          this.$store.commit("event/setEventMusic",this.item);
          this.$center.$emit("changeWindow",'AddEvent');
      }
  }
};
</script>

<style scoped lang="scss">
.music-item {
  padding: 8px 0;
  overflow: hidden;
  &-left {
    margin-left: 10px;
    float: left;

    img {
      width: 40px;
      height: 40px;
    }
  }
  &-title {
    width: 140px;
    margin-left: 10px;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .tag {
      display: inline-block;
      border: 1px solid #cc0000;
      color: #cc0000;
      width: 28px;
      height: 18px;
      line-height: 18px;
      text-align: center;
    }
  }
  &-right {
    float: right;
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>