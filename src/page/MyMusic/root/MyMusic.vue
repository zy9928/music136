<template>
  <div class="myMusic">
    <div class="view-wrap">
      <play-list :createNum="createList.length" :collectNum="collectList.length">
        <playlist-item
          slot="create"
          v-for="(item,index) in createList"
          :key="index"
          :name="item.name"
          :coverImgUrl="item.coverImgUrl"
        ></playlist-item>
        <playlist-item
          slot="collect"
          v-for="(item,index) in collectList"
          :key="index"
          :name="item.name"
          :coverImgUrl="item.coverImgUrl"
        ></playlist-item>
      </play-list>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "../../../router";
import store from "../../../store";
import Playlist from "./children/Playlist";
import PlaylistItem from "./children/playlist-item";

export default {
  data() {
    return {
      createList: [], //创建歌单
      collectList: [] //收藏歌单
    };
  },
  components: {
    [Playlist.name]: Playlist,
    [PlaylistItem.name]: PlaylistItem
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  //路由拦截
  beforeRouteEnter(to, from, next) {
    console.log("进入我的音乐组件");
    if (!store.state.user.isLogin) {
      router.push("/my");
    } else {
      next();
    }
  },
  //实例创建钩子函数
  created() {
    this.getPlaylist()
      .then(result => {
        let userId = this.userInfo.userId;
        let playlist = result.data.playlist;
        playlist.forEach(item => {
          if (item.creator.userId == userId) {
            if (item.name.endsWith("喜欢的音乐")) {
              item.name = "我喜欢的音乐";
            }
            this.createList.push(item);
          } else {
            this.collectList.push(item);
          }
        });
      })
      .catch(err => {
        alert("获取歌单失败");
        console.error(err);
      });
  },

  methods: {
    async getPlaylist() {
      let userId = this.userInfo.userId;
      let result = await this.$store.dispatch("myMusic/getPlaylist", userId);
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
.myMusic {
  background: #f5f5f5;
  height: 678px;
  overflow: auto;
  .view-wrap {
  }
}
</style>