<template>
  <section class="listStyleWrap">
    <slot />
    <div class="listStyleCont" v-if="data_kind != 'album'">
      <li class="songListLi" v-for="(item, key) in data" :key="key">
        <router-link class="listImg" :to="`/songList/${item.listId}`">
          <img :src="item.listImg" :alt="item.listName" />
        </router-link>
        <div class="listText">
          <router-link :to="`/songList/${item.listId}`" class="listName">{{item.listName}}</router-link>
          <p class="listBy">
            <span>by</span>
            <router-link :to="`/user/${item.listUserId}`">{{item.listUserName}}</router-link>
          </p>
        </div>
      </li>
    </div>
    <div class="listStyleCont" v-if="data_kind == 'album'">
      <li class="songListLi" v-for="(item, key) in data" :key="key">
        <router-link class="listImg" :to="`/album/${item.albumId}`">
          <img :src="item.albumImg" :alt="item.albumName" />
        </router-link>
        <div class="listText">
          <router-link :to="`/album/${item.albumId}`" class="listName">{{item.albumName}}</router-link>
          <p class="listBy">
            <span class="albumTime">{{item.albumTime}}</span>
          </p>
        </div>
      </li>
    </div>
  </section>
</template>

<script>
// 获取包含该歌曲的歌单
// 相关歌单推荐
// 获取ta的更多专辑
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: []
    };
  },
  props: {
    title: "",
    data_kind: ""
  },
  computed: {
    ...mapState({
      songId: state => state.aside.songId,
      songListId: state => state.aside.songListId,
      singerId: state => state.aside.singerId,
      albumSingerId: state => state.aside.albumSingerId,
      similarSongList: state => state.aside.similarSongList,
      relateSongListRecommend: state => state.aside.relateSongListRecommend,
      singerAlbum: state => state.aside.singerAlbum
    }),
    id() {
      if (this.data_kind == "song") {
        return this.songId;
      } else if (this.data_kind == "songList") {
        return this.songListId;
      } else if (this.data_kind == "album") {
        return this.albumSingerId;
      }
    }
  },
  watch: {
    id(newVal, oldVal) {
      this.getData();
    }
  },
  methods: {
    async getData() {
      // 放入computed不加async就死循环
      if (this.data_kind == "song") {
        await this.$store.dispatch("aside/getSimilarSongList", { id: this.id });
        this.data = this.similarSongList;
      } else if (this.data_kind == "songList") {
        await this.$store.dispatch("aside/getRelateSongListRecommend", {
          id: this.id
        });
        this.data = this.relateSongListRecommend;
      } else if (this.data_kind == "album") {
        await this.$store.dispatch("aside/getSingerAlbum", {
          id: this.id,
          limit: 5
        });
        this.data = this.singerAlbum;
      }
    }
  },
  mounted() {
    if (this.id) {
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
.listStyleWrap {
  margin-bottom: 10px;
  overflow: hidden;
  .listStyleCont {
    .songListLi {
      list-style: none;
      padding: 5px 0;
      height: 50px;
      width: 100;
      overflow: hidden;
      position: relative;
      .listImg {
        display: block;
        position: absolute;
        top: 5px;
        left: 0;
        & > img {
          width: 50px;
          height: 50px;
        }
      }
      .listText {
        padding-left: 60px;
        height: 50px;
        @mixin textHidden {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .listName {
          display: block;
          line-height: 24px;
          font-weight: bold;
          width: 100%;
          @include textHidden;
        }
        .listBy {
          width: 100%;
          overflow: hidden;
          line-height: 20px;
          & > span {
            vertical-align: bottom;
            margin-right: 5px;
          }
          & > a,
          .albumTime {
            color: #666;
            display: inline-block;
            width: 124px;
            @include textHidden;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>