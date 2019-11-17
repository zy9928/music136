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
                <music-tab :itemList="itemList"></music-tab>
            </div>
            <div class="main-content-list">

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
      itemList: [
        {
          title:"单曲"
        },
        {
          title:"歌手"
        },
        {
          title:"专辑"
        },
        {
          title:"歌单"
        },
        {
          title:"主播电台"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      eventMusic: state => state.event.eventMusic
    }),
    title() {
      return this.eventMusic.length > 0 ? "修改音乐" : "添加音乐";
    }
  },
  methods: {
    backAction() {
      this.$center.$emit("changeWindow", "AddEvent");
    }
  },
  components:{
    'music-tab':()=> import ("./music-tab")
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
      p{
        text-align: center;
        float: left;
        width: 27px;
        height: 27px;
        line-height: 27px;
        .iconfont{
          font-size: 18px;
        }
      }
      input{
        float: left;
        width: 401px;
        height: 27px;
        outline: none;
        border:none;
      }
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