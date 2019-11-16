<template>
  <div class="playListLift">
    <playListUl />
    <section class="noSongTip" v-show="playList.length == 0">
      <p class="fistLine">
        <span class="ico"></span>
        <span class="text">你还没有添加任何歌曲</span>
      </p>
      <p class="secendLine">
        去首页
        <router-link to="/home/recommend">发现音乐</router-link>，或在
        <router-link to="/myMusic">我的音乐</router-link>收听自己收藏的歌单
      </p>
    </section>
  </div>
</template>

<script>
import { getSongInfo } from "./../../../services/playServe.js";
import { mapState } from "vuex";
import playListUl from "./../fourth/playListUl";
var textIndex = 0;
let playListMiddle = [];
let playerSettingMiddle = {};
export default {
  components: {
    playListUl
  },
  data() {
    return {
      songInfo: {}
    };
  },
  computed: {
    ...mapState({
      playNowId: state => state.playBar.playNowId,
      playList: state => state.playBar.playList,
      playerSetting: state => state.playBar.playerSetting,
      addSongId: state => state.playBar.addSongId
    })
  },
  watch: {
    async addSongId(newVal, oldVal) {
      if (newVal) {
        // 请求当前请求的音乐信息
        await this.handleGetSongInfo(newVal);
        // 将store中的值赋值出来（因为不能直接更改）
        playListMiddle = [...this.playList];
        if (this.playList.length == 0) {
          playListMiddle.push(this.songInfo);
          this.$store.commit("playBar/setPlayList", playListMiddle);
        } else {
          // 若歌单不为空，查找当前请求ID是否在歌单中拥有
          var found = playListMiddle.find(info => {
            return info.id == newVal;
          });
          if (!found) {
            // 不拥有，添加进歌单，
            playListMiddle.push(this.songInfo);
            this.$store.commit("playBar/setPlayList", playListMiddle);
          }
        }
      }
    },
    async playNowId(newVal, oldVal) {
      if (newVal) {
        // 请求当前请求的音乐信息
        await this.handleGetSongInfo(this.playNowId);
        // 将store中的值赋值出来（因为不能直接更改）
        playListMiddle = [...this.playList];
        playerSettingMiddle = { ...this.playerSetting };
        // 如果歌单为空，直接添加
        if (this.playList.length == 0) {
          playListMiddle.push(this.songInfo);
          playerSettingMiddle.index = 0;
          this.$store.commit("playBar/setPlayList", playListMiddle);
          this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
        } else {
          // 若歌单不为空，查找当前请求ID是否在歌单中拥有
          var found = playListMiddle.find(info => {
            return info.id == newVal;
          });
          if (!found) {
            // 不拥有，添加进歌单，
            playListMiddle.push(this.songInfo);
            this.$store.commit("playBar/setPlayList", playListMiddle);
            playerSettingMiddle.index = playListMiddle.length - 1;
            this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
          } else {
            // 拥有，更新播放歌曲index
            var index = playListMiddle.indexOf(found);
            playerSettingMiddle.index = index;
            this.$store.commit("playBar/setPlayerSetting", playerSettingMiddle);
          }
        }
      }
    }
  },
  methods: {
    async handleGetSongInfo(value) {
      const result = await getSongInfo(value);
      this.songInfo = result.songInfoAll;
    }
  }
};
</script>

<style scoped lang="scss">
.playListLift {
  width: 558px;
  height: 260px;
  float: left;
  background-color: rgba(0, 0, 0, 0.88);
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: #0F0B0B;
  }
  &::-webkit-scrollbar-thumb{
    background-color: #494949;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track{
    border-radius: 10px;
  }
  .noSongTip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    & > p {
      text-align: center;
      color: #aaaaaa;
      line-height: 40px;
      & > a {
        color: #aaaaaa;
        text-decoration: underline;
      }
      & > span {
        vertical-align: middle;
      }
      .ico {
        display: inline-block;
        width: 36px;
        height: 28px;
        background: url(./../../../assets/zy_playlist.png) no-repeat -138px 0;
      }
    }
  }
}
</style>