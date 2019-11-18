<template>
  <div class="music-list">
    <div class="music-list-item" v-if="listType==1">
      <music-item v-for="(item,index) in  musicList"  :item="item" :key="index">
        <template slot="left">
          <span class="iconfont iconcc-play"></span>
        </template>
        <template slot="right">
          <span v-for="(value,index) in item.artists" :key="index">
            <template v-if="index!=0">/</template>
            {{value.name}}
          </span>
        </template>
      </music-item>
    </div>
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
    list: {
      type: Array
    }
  },
  components: {
    "music-item": () => import("./music-item")
  },
  computed:{
    musicList(){
      let arr = [...this.list]
      arr.shift();
      return arr;
    }
  }
};
</script>

<style>
</style>