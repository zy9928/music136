<template>
  <section class="songInfoWrap">
    <aside class="albumAside">
      <div class="albumImgBox">
        <img
          :src="dataSongInfo.al ? dataSongInfo.al.picUrl : ''"
          :alt="dataSongInfo.al ? dataSongInfo.al.name : ''"
        />
      </div>
    </aside>
    <main class="songInfoMain">
      <h4 class="songName">
        <span>单曲</span>
        {{dataSongInfo.name}}
      </h4>
      <div class="singerAlbum">
        <p class="singerBox">
          歌手：
          <router-link
            v-for="(item, key) in singer"
            :key="key"
            :to="`/singer/${item.id}`"
          >{{item.name}}</router-link>
        </p>
        <p class="albumBox">所属专辑： <router-link :to="`/album/${dataSongInfo.al ? dataSongInfo.al.id : ''}`">{{dataSongInfo.al ? dataSongInfo.al.name : ''}}</router-link></p>
      </div>
      <playCtrl :id="id"/>
    </main>
  </section>
</template>

<script>
import { mapState } from "vuex";
import playCtrl from './../second/playCtrl';
export default {
  components: {
    playCtrl,
  },
  data() {
    return {
      dataSongInfo: {}
    };
  },
  computed: {
    ...mapState({
      songId: state => state.aside.songId,
      songInfo: state => state.songInfo.songInfo
    }),
    id() {
      return this.songId;
    },
    singer() {
      var arr = [];
      if (this.dataSongInfo.ar) {
        this.dataSongInfo.ar.forEach((item, key) => {
          if (key == this.dataSongInfo.ar.length - 1) {
            arr.push({
              id: item.id,
              name: item.name
            });
          } else if (key < this.dataSongInfo.ar.length - 1) {
            arr.push({
              id: item.id,
              name: item.name + "/"
            });
          }
        });
      }
      return arr;
    }
  },
  methods: {
    async getSongInfo() {
      await this.$store.dispatch("songInfo/getSongInfo", { ids: this.id });
      this.dataSongInfo = this.songInfo;
    }
  },
  watch: {
    id(newVal, oldVal) {
      this.getSongInfo();
    }
  },
  mounted() {
    if (this.id) {
      this.getSongInfo();
    }
  }
};
</script>

<style scoped lang="scss">
.songInfoWrap {
  width: 100%;
  overflow: hidden;
  padding: 35px 36px 0;
  box-sizing: border-box;
  .albumAside {
    width: 205px;
    float: left;
    .albumImgBox {
      width: 205px;
      height: 205px;
      background: url(./../../../assets/zy_coverall.png) no-repeat -140px -580px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > img {
        width: 130px;
        height: 130px;
        border-radius: 50%;
      }
    }
  }
  .songInfoMain {
    float: left;
    width: 432px;
    padding: 0 25px;
    box-sizing: border-box;
    .songName {
      font-size: 26px;
      width: 100%;
      box-sizing: border-box;
      position: relative;
      padding-left: 68px;
      & > span {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        width: 59px;
        height: 26px;
        background: url(./../../../assets/cc-tag.png) no-repeat 0 0;
        color: #fcf0f0;
        line-height: 26px;
        box-sizing: border-box;
        padding-left: 10px;
      }
    }
    .singerAlbum{
      padding-top: 10px;
      &>p{
        line-height: 25px;
        &>a{
          color: #0C73C2;
        }
      }
    }
  }
}
</style>