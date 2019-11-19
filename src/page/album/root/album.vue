<template>
  <div class="page" id="album">
    <main class="albumMain">
      <div class="albumWrap">
        <albumInfoPage :dataAlbum="albumInfo" :dataSongs="albumSongs">
          <p class="pagePlayCtrl">
            <span class="playBtn">
              <i class="el-icon-video-play"></i>
              <i title="播放" @click="playClc">播放</i>
              <i class="el-icon-plus addBtn" @click="addClc" title="添加到播放列表"></i>
            </span>
            <span class="likeBtn" title="收藏">
              <i class="el-icon-star-off"></i>
              ({{albumInfo.likedCount}})
            </span>
            <span class="shareBtn" title="分享">
              <i class="el-icon-share"></i>
              ({{albumInfo.shareCount}})
            </span>
            <span class="downBtn" title="下载">
              <i class="el-icon-download"></i>下载
            </span>
            <a href="#comment" class="commentBtn" title="评论">
              <i class="el-icon-s-comment"></i>
              ({{albumInfo.commentCount}})
            </a>
          </p>
        </albumInfoPage>
      </div>
      <div class="musicBox">
        <musicList :dataList="albumSong" :dataInfo="albumInfo" />
      </div>
      <comment type="album" :ID="id" />
    </main>
    <pageAside kind="album" />
  </div>
</template>

<script>
import pageAside from "./../../../components/pageAside/pageAside";
import musicList from "./../../../components/musicList/musicList";
import albumInfoPage from "./../stair/albumInfoPage";
import { mapState } from "vuex";
export default {
  components: {
    pageAside,
    musicList,
    albumInfoPage
  },
  computed: {
    ...mapState({
      albumInfo: state => state.albumInfo.albumInfo,
      albumSong: state => state.albumInfo.albumSong,
      albumSongs: state => state.albumInfo.albumSongs,
      playList: state => state.playBar.playList,
    })
  },
  props: {
    id: ""
  },
  watch: {
    id(newVal, oldVal) {
      this.getInfo(newVal);
    }
  },
  methods: {
    async getInfo() {
      await this.$store.dispatch("albumInfo/getalbum", { id: this.id });
      this.$store.commit(
        "aside/setAlbumSingerId",
        this.albumInfo.singers[0].id
      );
    },
    playClc() {
      this.addClc();
      this.$store.commit("playBar/setPlayNowId", this.albumSongs[0].id);
      var obj = { ...this.playerSetting };
      obj.loopMode = 0;
      this.$store.commit("playBar/setPlayerSetting", obj);
    },
    addClc() {
      var listNow = this.playList;
      var arr = [];
      listNow.forEach((item, key) => {
        var found = this.albumSongs.find(value => {
          return value.id == item.id;
        });
        if (found) {
          arr.unshift(key);
        }
      });
      arr.forEach(item => {
        listNow.splice(item, 1);
      });
      listNow = [...listNow, ...this.albumSongs];
      this.$store.commit("playBar/setPlayList", listNow);
    }
  },
  mounted() {
    if (this.id) {
      this.getInfo();
    }
  }
};
</script>

<style scoped lang="scss">
#album {
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  background-color: #fff;
  overflow: hidden;
  .albumMain {
    width: 709px;
    float: left;
    border-right: 1px solid #e9e9e9;
    .albumWrap {
      overflow: hidden;
      padding: 35px 36px 0;
      margin-bottom: 30px;
      .pagePlayCtrl {
        width: 100%;
        padding: 10px 0;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        & > span,
        & > a {
          display: inline-block;
          font-size: 14px;
          line-height: 30px;
          background: #f1f1f1;
          padding: 0 5px;
          border-radius: 5px;
          color: #666666;
          cursor: pointer;
          & > i {
            padding: 0 3px;
          }
        }
        .playBtn {
          background: #3988d3;
          color: #ffffff;
          .addBtn {
            border-left: 1px solid #666;
            display: inline-block;
          }
        }
      }
    }
    .musicBox {
      padding: 0 30px 0 38px;
    }
  }
}
</style>