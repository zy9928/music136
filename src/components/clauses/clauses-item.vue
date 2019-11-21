<template>
  <tr id="clauses-item">
    <td>
      {{index+1}}
      <span
        @click="playAction()"
        class="iconfont iconcc-play"
        :class="{active:value==item.id}"
      ></span>
    </td>
    <td class="songName"><a @click.prevent="goSong(item.id)" href="#">
      {{item.name}}</a></td>
    <td @mouseenter="showOpaAction()" @mouseleave="hideOpaAction()">
      <keep-alive>
        <span v-if="!showOpa">{{time}}</span>
        <div class="show-opa" v-else>
          <a href="#" @click.prevent="handleAdd">
            <span  class="iconfont iconcc-add"></span>
          </a>
          <a href="#">
            <span class="iconfont iconcc-collect"></span>
          </a>
          <a href="#">
            <span class="iconfont iconcc-share"></span>
          </a>
          <a href="#">
            <span class="iconfont iconcc-download"></span>
          </a>
          <a href="#" v-if="isMine">
            <span class="iconfont iconcc-delete"></span>
          </a>
        </div>
      </keep-alive>
    </td>
    <td>{{author}}</td>
    <td>{{item.al.name}}</td>
  </tr>
</template>

<script>
import TimeHandle from "../../utils/TimeHandle";

export default {
  name: "clauses-item",
  data() {
    return {
      showOpa: false //是否显示操作栏,
    };
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: Number,
    value: Number, //当前播放音乐的id
    isMine: Boolean//是否是当前用户创建的条目
   
  },
  computed: {
    author() {
      let nameArr = this.item.ar.map(item => item.name);
      return nameArr.join("/");
    },
    time() {
      return TimeHandle.getMS(this.item.dt);
    }
  },
  methods: {
    playAction() {
      this.$emit("input", this.item.id);
      //调用播放接口
      this.$store.commit("playBar/setPlayNowId", this.item.id);
    },
    showOpaAction() {
      this.showOpa = true;
    },
    hideOpaAction() {
      this.showOpa = false;
    },
    handleAdd(){
      this.$emit('addMusic');
    },
    goSong(id){
      this.$router.push(`/play/${id}`);
    }
  }
};
</script>

<style scoped lang="scss">
#clauses-item {
  td {
    border: 1px solid #bbb;
    color: #333;
    padding: 6px 10px;
    line-height: 25px;
    .show-opa {
      a {
        margin-right: 4px;

        float: left;
        .iconfont {
          font-size: 14px;
          color: #999;
          &:hover {
            color: #666;
          }
        }
      }
    }
    .iconfont {
      font-size: 18px;
      float: right;
      color: #b3b3b3;
      cursor: pointer;
    }
    .active {
      color: #d74040;
    }
  }
  .songName{
    a{
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>