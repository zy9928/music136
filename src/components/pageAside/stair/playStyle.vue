<template>
  <section class="playStyleWrap">
    <slot />
    <div class="playStyleCont">
      <li class="simiSongLi" v-for="(item, key) in dataValue" :key="key">
        <div class="songText">
          <router-link class="songName" :to="`/play/${item.songId}`">{{item.songName}}</router-link>
          <p class="singers">
            <router-link
              v-for="(singer, index) in item.singer"
              :key="index"
              :to="`/singer/${singer.singerId}`"
            >{{singer.singerName}}</router-link>
          </p>
        </div>
        <i class="el-icon-caret-right" @click="playClc(item.songId)"></i>
        <span class="el-icon-plus" @click="addClc(item.songId)"></span>
      </li>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dataValue: []
    };
  },
  props: {
    data_kind: ""
  },
  computed: {
    ...mapState({
      songId: state => state.aside.songId,
      similarSong: state => state.aside.similarSong
    }),
    id() {
      return this.songId;
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
      await this.$store.dispatch("aside/getSimilarSong", { id: this.id });
      this.dataValue = this.similarSong;
    },
    playClc(id) {
      this.$store.commit("playBar/setPlayNowId", id);
    },
    addClc(id) {
      this.$store.commit("playBar/setAddSongId", id);
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
.playStyleWrap {
  margin-bottom: 10px;
  overflow: hidden;
  @mixin textHidden {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .playStyleCont {
    .simiSongLi {
      list-style: none;
      position: relative;
      a:hover {
        text-decoration: underline;
      }
      .songText {
        width: 100%;
        box-sizing: border-box;
        padding-right: 75px;
        .songName {
          line-height: 20px;
          color: #333;
          display: block;
          width: 100%;
          @include textHidden;
        }
        .singers {
          @include textHidden;
          & > a {
            color: #999;
            font-size: 12px;
          }
        }
      }
      & > i,
      & > span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        color: #ccc;
        &:hover {
          color: #666;
        }
      }
      & > i {
        right: 50px;
      }
      & > span {
        right: 20px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>