<template>
  <div class="myMusic">
    <div class="view-wrap">
      <div class="play-nav">
        <play-list :createNum="createList.length" :collectNum="collectList.length">
          <playlist-item
            slot="create"
            v-for="(item,index) in createList"
            :key="index"
            :name="item.name"
            :trackCount="item.trackCount"
            :coverImgUrl="item.coverImgUrl"
            :listId="item.id"
            :isMine="true"
            :class="{active:item.id==selected.id}"
            @click="tabAction(item)"
            :index="index"
          ></playlist-item>
          <playlist-item
            slot="collect"
            v-for="(item,index) in collectList"
            :key="index"
            :name="item.name"
            :trackCount="item.trackCount"
            :coverImgUrl="item.coverImgUrl"
            :listId="item.id"
            @click="tabAction(item)"
            :class="{active:item.id==selected.id}"
          ></playlist-item>
        </play-list>
      </div>
      <div class="play-content">
        <clauses-header
          :picture="selected&&selected.coverImgUrl"
          :title="selected&&selected.name"
          :creator="selected&&selected.creator.nickname"
          :createTime="createTime"
          :creatorImg="selected&&selected.creator.avatarUrl"
          :tags="selected.tags"
          :desc="selected.description"
        ></clauses-header>
        <clauses-list :playlist="selected?selected:{}" :tableItemList="tracks">
          <clauses-item
            :isMine="isMine"
            v-for="(item,index) in tracks"
            v-model="playId"
            :key="index"
            :item="item"
            :index="index"
          />
        </clauses-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import router from "../../../router";
import store from "../../../store";
import Playlist from "./children/Playlist";
import PlaylistItem from "./children/playlist-item";
import ClausesHeader from "../../../components/clauses/clauses-header";
import ClausesList from "../../../components/clauses/clauses-list";
import ClausesItem from "../../../components/clauses/clauses-item";
import TimeHandle from "../../../utils/TimeHandle";
import { userInfo } from "os";

export default {
  data() {
    return {
      createList: [], //创建歌单
      collectList: [], //收藏歌单,
      selected: "", //选中的歌单,
      tracks: [], //歌单中的歌曲,
      playId: -1 //当前播放歌曲的id
    };
  },
  components: {
    [Playlist.name]: Playlist,
    [PlaylistItem.name]: PlaylistItem,
    [ClausesHeader.name]: ClausesHeader,
    [ClausesList.name]: ClausesList,
    [ClausesItem.name]: ClausesItem
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    createTime() {
      return TimeHandle.getYMD(this.selected.createTime);
    },
    isMine() {
      //判断当前歌单是否属于当前用户创建
      return this.userInfo.userId == this.selected.creator.userId;
    }
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
    console.log("调用了");
    let body = document.querySelector("body");
    body.style.overflow = "hidden";
    this.getPlaylist()
      .then(result => {
        let userId = this.userInfo.userId;
        let playlist = result.data.playlist;
        this.selected = playlist[0];
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

        //获取歌单详情
        this.getPlaylistDetail()
          .then(result => {
            console.log(result);
            this.tracks = result.data.playlist.tracks;
          })
          .catch(err => {
            alert("获取歌曲失败");
            console.log(err);
          });
      })
      .catch(err => {
        alert("获取歌单失败");
        console.error(err);
      });
  },

  beforeDestroy() {
    console.log("执行了");
    let body = document.querySelector("body");
    body.style.overflow = "auto";
  },
  watch: {
    //监听器
    selected() {
      // 获取歌单详情;
      this.getPlaylistDetail()
        .then(result => {
          console.log(result);
          this.tracks = result.data.playlist.tracks;
        })
        .catch(err => {
          alert("获取歌曲失败");
          console.log(err);
        });
    }
  },
  methods: {
    async getPlaylist() {
      let userId = this.userInfo.userId;
      let result = await this.$store.dispatch("myMusic/getPlaylist", userId);
      return result;
    },
    async getPlaylistDetail() {
      let result = await this.$store.dispatch(
        "myMusic/getPlaylistDetail",
        this.selected.id
      );
      return result;
    },
    tabAction(item) {
      this.selected = item;
    }
  }
};
</script>

<style scoped lang="scss">
.myMusic {
  // height: 678px;
  overflow: auto;
  .view-wrap {
    // height: 100%;
    position: relative;

    .play-nav {
      height: 100%;
      width: 242px;
      position: fixed;
      top: 75px;
      bottom: 0;
      overflow-y: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
      }
      &::-webkit-scrollbar-track {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      }
    }
    .play-content {
      height: 678px;
      padding-left: 242px;
      float: left;
    }
  }
}
</style>
<style lang="scss">
body {
  overflow: hidden;
}
</style>