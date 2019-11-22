<template>
  <div class="searchNav">
    <span v-for="item in navLi" :key="item.type" @click="tap(item.type)" :class="{active: value == item.type}">{{item.title}}</span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      navLi: [
        {
          title: "单曲",
          type: 1,
        },
        {
          title: "歌手",
          type: 100,
        },
        {
          title: "专辑",
          type: 10,
        },
        {
          title: "视频",
          type: 1014,
        },
        {
          title: "歌词",
          type: 1006,
        },
        {
          title: "歌单",
          type: 1000,
        },
        {
          title: "主播电台",
          type: 1009,
        },
        {
          title: "用户",
          type: 1002,
        }
      ]
    }
  },
  props: {
    value: "",
  },
  methods: {
    tap(val){
      this.$emit("input", val);
    }
  },
}
</script>

<style scoped lang="scss">
.searchNav{
  width: 100%;
  height: 34px;
  line-height: 34px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  &>span{
    flex: 1;
    display: block;
    height: 100%;
    text-align: center;
    background: #F8F8F8;
    border-top: 2px solid #ccc;
    border-bottom: 1px solid #ccc;
    &:hover{
      border-top: 2px solid #D13030;
    }
  }
  .active{
    background: #fff;
    border-bottom: none;
    border-top: 2px solid #D13030;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
}

</style>