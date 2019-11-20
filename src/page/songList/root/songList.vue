<template>
  <div class="page" id="songList">
    <main class="songListMain">
      <div class="songListWrap">
        <aside class="albumImg">
          <div class="albumImgBox">
            <img :src="listInfo.img" alt />
          </div>
        </aside>
        <listInfo :dataList="listInfo" :dataCreater="createrInfo" :dataSongs="songList"/>
      </div>
      <div class="musicBox">
        <musicList :dataList="songList" :dataInfo="listInfo"/>
      </div>
      <comment type="playList" :ID="id" />
    </main>
    <pageAside kind="songList" />
  </div>
</template>

<script>
import listInfo from "./../stair/listInfo";
import pageAside from "./../../../components/pageAside/pageAside";
import { mapState } from "vuex";
import musicList from './../../../components/musicList/musicList';
export default {
  data() {
    return {
      info: {}
    };
  },
  computed: {
    ...mapState({
      listInfo: state => state.songList.listInfo,
      createrInfo: state => state.songList.createrInfo,
      songList: state => state.songList.songList
    })
  },
  components: {
    pageAside,
    listInfo,
    musicList
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
    rememberId() {
      this.$store.commit("aside/setSongListId", this.id);
    },
    async getInfo() {
      await this.$store.dispatch("songList/getSongListInfo", { id: this.id });
    }
  },
  mounted() {
    this.rememberId();
    if (this.id) {
      this.getInfo();
    }
  },
  updated() {
    this.rememberId();
  }
};
</script>

<style scoped lang="scss">
#songList {
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  background-color: #fff;
  overflow: hidden;
  .songListMain {
    width: 709px;
    float: left;
    border-right: 1px solid #e9e9e9;
    .songListWrap {
      overflow: hidden;
      padding: 35px 36px 0;
      .albumImg {
        width: 205px;
        float: left;
        .albumImgBox {
          width: 205px;
          height: 205px;
          border: 1px solid #ccc;
          padding: 3px;
          box-sizing: border-box;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .musicBox{
      padding: 0 30px 0 38px;
    }
  }
}
</style>