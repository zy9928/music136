<template>
  <div class="music-tab">
    <div
      class="music-tab-item"
      :class="{tbActive:item.index==selectIndex}"
      @click="tabAction(item)"
      v-for="item in itemList"
      :key="item.title"
    >{{item.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: Array,
    value: String
  },
  data() {
    return {
        selectIndex: 0
    }
  },
  methods:{
      tabAction(item){
          this.selectIndex = item.index;
          this.$emit('input',item.type);
      }
  }
};
</script>

<style scoped lang="scss">
.music-tab {
  height: 28px;
  
  &-item {
    width: 88px;
    height: 28px;
    float: left;
    text-align: center;
    line-height: 28px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    border-top: 1px solid #fff;
    cursor: pointer;
  }
  .tbActive {
    border-bottom-color: #fff;
    border-top: 1px solid #e70012;
  }
}
</style>