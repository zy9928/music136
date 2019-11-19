<template>
  <div class="add-music">
    <my-window :title="title">
      <template slot="content">
        <div class="main">
          <div class="main-content">
            <div class="main-content-search">
              <p>
                <span class="iconfont iconcc-search"></span>
              </p>
              <input type="text" v-model="searchValue" />
            </div>
            <div class="main-content-tab">
              <music-tab :itemList="itemList" v-model="selectType"></music-tab>
            </div>
            <div class="main-content-list">
              <music-list :list="selectList" :listType="selectType"></music-list>
            </div>
          </div>

          <div class="opa">
            <button @click="backAction">返回</button>
          </div>
        </div>
      </template>
    </my-window>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      selectType: "1", //1单曲、10: 专辑, 100: 歌手, 1000: 歌单 1009: 电台,
      itemList: [
        {
          type: "1",
          index: 0,
          title: "单曲"
        },
        {
          type: "100",
          index: 1,
          title: "歌手"
        },
        {
          type: "10",
          index: 2,
          title: "专辑"
        },
        {
          type: "1000",
          index: 3,
          title: "歌单"
        },
        {
          type: "1009",
          index: 4,
          title: "主播电台"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      eventMusic: state => state.event.eventMusic,
      musicList: state => state.event.musicList
    }),
    title() {
      return Object.keys(this.eventMusic).length > 0 ? "修改音乐" : "添加音乐";
    },
    selectList() {
      if (this.searchValue == "") {
        return [];
      }
      //选择的音乐列表
      return this.musicList[this.selectType] || [];
    }
  },
  methods: {
    backAction() {
      this.$center.$emit("changeWindow", "AddEvent");
      this.searchValue = '';
      this.selectType='1';
    }
  },
  components: {
    "music-tab": () => import("./music-tab"),
    "music-list": () => import("./music-list")
  },
  watch: {
    //监听关键词的变化，请求数据
    async searchValue() {
      if (!this.searchValue) {
        return false;
      }

      try {
        let params = {
          keywords: this.searchValue,
          limit: 10,
          type: this.selectType
        };
        let result = await this.$store.dispatch(
          "event/searchMusicList",
          params
        );
        let key = "";
        let arr = [];
        switch (this.selectType) {
          case "1": //单曲
            key = "1";
            arr = result.data.result.songs;

            break;
          case "10": //专辑
            key = "10";
            arr = result.data.result.albums;
            break;
          case "100": //歌手
            key = "100";
            arr = result.data.result.artists;
            break;
          case "1000": //歌单
            key = "1000";
            arr = result.data.result.playlists;
            break;
          case "1009": //电台
            key = "1009";
            arr = result.data.result.djRadios;
            break;
        }
        //给数组添加关键词标志，防止重复请求
        console.log(this.searchValue);
        if (arr) {
          arr.unshift({
            keywords: this.searchValue
          });
        }

        this.$store.commit("event/setMusicList", { key, arr });
        //为了触发set方法
        let type = this.selectType;
        this.selectType = -1;
        this.selectType = type;
      } catch (error) {
        alert("获取失败");
        console.log(error);
      }
    },

    //监听tab的变化请求数据
    async selectType() {
      if (!this.searchValue) {
        return false;
      }

      if (
        Object.keys(this.musicList).length > 0 &&
        this.musicList[this.selectType]
      ) {
        console.log(this.musicList[this.selectType][0].keywords);
        if (this.musicList[this.selectType][0].keywords == this.searchValue) {
          //如果关键词不变，切仓库中有数据，不再重新请求,返回缓存数据
          console.log("返回缓存数据");
          return;
        }
      }

      try {
        let params = {
          keywords: this.searchValue,
          limit: 10,
          type: this.selectType
        };
        let result = await this.$store.dispatch(
          "event/searchMusicList",
          params
        );
        let key = "";
        let arr = [];
        switch (this.selectType) {
          case "1": //单曲
            key = "1";
            arr = result.data.result.songs;

            //给数组添加关键词标志，防止重复请求
            break;
          case "10": //专辑
            key = "10";
            arr = result.data.result.albums;
            break;
          case "100": //歌手
            key = "100";
            arr = result.data.result.artists;
            break;
          case "1000": //歌单
            key = "1000";
            arr = result.data.result.playlists;
            break;
          case "1009": //电台
            key = "1009";
            arr = result.data.result.djRadios;
            break;
        }
         if (arr) {
          arr.unshift({
            keywords: this.searchValue
          });
        }
        this.$store.commit("event/setMusicList", { key, arr });
        //为了触发set方法
        let type = this.selectType;
        this.selectType = -1;
        this.selectType = type;
      } catch (error) {
        alert("获取失败");
        console.log(error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 528px;
  height: 357px;
  padding: 20px 40px 30px;
  box-sizing: border-box;
  &-content {
    height: 266px;
    border: 1px solid #ccc;
    &-search {
      height: 27px;
      padding: 5px 10px 6px 0;
      border-bottom: 1px solid #ccc;
      p {
        text-align: center;
        float: left;
        width: 27px;
        height: 27px;
        line-height: 27px;
        .iconfont {
          font-size: 18px;
        }
      }
      input {
        float: left;
        width: 401px;
        height: 27px;
        outline: none;
        border: none;
      }
    }
    &-tab {
      overflow: hidden;
    }
    &-list {
      overflow: auto;
      height: 196px;
    }
  }
  .opa {
    margin-top: 20px;
    button {
      border: 0;
      margin: 0 auto;
      width: 64px;
      height: 31px;
      background: #2475c3;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
      outline: none;
    }
  }
}
</style>