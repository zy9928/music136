<template>
  <div class="comment" id="comment">
    <div class="tit">
      <h3 class="title">评论</h3>
      <span class="subTitle">
        共&nbsp;
        <b>{{totalCom}}</b>&nbsp;条评论
      </span>
    </div>
    <p class="line"></p>
    <div class="com">
      <img src="../../assets/sry-profile-photo.jpg" alt="头像" class="photo" />
      <div class="comIptBox">
        <textarea
          type="text"
          class="comIpt"
          placeholder="评论"
          ref="textArea"
          @input="iptChangeAction"
        ></textarea>
        <vue-textarea-suggester
          v-model="extracts"
          :target="target"
          :rules="rules"
          @matched="matched"
          ref="suggester"
        />
      </div>
    </div>
    <div class="navBox">
      <i class="iconfont iconxiaolian"></i>
      <i class="iconfont iconaite" @click="aiteAction"></i>
      <span class="num">{{show}}</span>
      <p class="comBtn" @click="goComment">评论</p>

      <ul class="aiteShow" ref="aiteShow">
        <li class="selectItem">选择最近@的人或直接输入</li>
        <li
          class="aiteItem"
          v-for="(item,index) in aiteList"
          :key="index"
          @click="aiteItemAction(index)"
          ref="aiteItem"
        >{{item}}</li>
      </ul>
    </div>

    <div class="mask" ref="mask" @click="maskAction"></div>

    <hotList :hotData="hotCom" v-if="hotCom"></hotList>
    <comList :comdData="timeCom" :totalNum="totalCom" @offsetNumAction="handleoffsetNum"></comList>
  </div>
</template>

<script>
import comList from "./sonList/comList";
import hotList from "./sonList/hotList";
import { getSongComments, getSendDelete } from "../../services/comment";
import { log } from "util";
import Vue from "vue";
import VueTextaSuggester from "vue-textarea-suggester";
import "vue-textarea-suggester/dist/vue-textarea-suggester.css";
Vue.use(VueTextaSuggester);

import api from "../../utils/api";
export default {
  name: "comment",
  props: {
    type: String,
    ID: String
  },
  components: {
    comList,
    hotList
  },
  data() {
    return {
      show: 140,
      selectIndex: 0,
      timeCom: [],
      hotCom: [],
      totalCom: "",
      num: "",
      time: "",
      // ID: '',
      aiteList: ["云音乐小秘书", "网易UFO丁嘉", "网易云音乐"],
      target: null,
      extracts: [],
      rules: [
        {
          rule: /@/,
          data: [
            { label: "云音乐小秘书" },
            { label: "网易UFO丁嘉" },
            { label: "网易云音乐" }
          ]
        }
      ]
    };
  },
  watch: {
    ID(newVal, oldVal){
      this.getInit();
    }
  },
  methods: {
    //请求评论数据
    async getInit() {
      if(this.type== 'music'){
        var comType = api.SONG_COMMENT;
      }else if(this.type== 'album'){
        var comType = api.SONG_ALBUM;
      }else if(this.type== 'playList'){
        var comType = api.SONG_PLAYLIST;
      }else if(this.type== 'mv'){
        var comType = api.SONG_MV;
      }else if(this.type== 'dj'){
        var comType = api.SONG_DJ;
      }else if(this.type== 'video'){
        var comType = api.SONG_VIDEO;
      }else if(this.type== 'hot'){
        var comType = api.SONG_HOT;
      }

      // var comType = api.SONG_COMMENT;
      // this.ID = 186016;
      const { timeCom, hotCom, totalCom } = await getSongComments(
        comType,
        this.ID,
        this.num,
        this.time
      );
      this.timeCom = timeCom
      this.hotCom = hotCom;
      this.totalCom = totalCom;
    },
    //判断输入的字符数
    iptChangeAction() {
      this.$refs.suggester.change();
      this.show = 140 - this.$refs.textArea.value.length;
    },
    matched(rule, query, row) {
      // console.log(`rule ${JSON.stringify(rule)}`);
      // console.log(`query ${JSON.stringify(query)}`);
      // console.log(`row ${JSON.stringify(row)}`);
    },
    //点击了@的事件
    aiteAction() {
      this.$refs.aiteShow.style.display = "block";
      this.$refs.mask.style.display = "block";
      this.$refs.textArea.value += "@";
      //添加焦点
      this.$refs.textArea.focus();
    },
    //点击@选择了数据以后产生的事件
    aiteItemAction(index) {
      this.selectIndex = index;
      this.$refs.textArea.value += this.$refs.aiteItem[
        this.selectIndex
      ].innerText;
      //添加焦点
      this.$refs.textArea.focus();
      this.$refs.aiteShow.style.display = "none";
      this.$refs.mask.style.display = "none";
      this.show = 140 - this.$refs.textArea.value.length;
    },
    //点击蒙板的事件
    maskAction() {
      this.$refs.aiteShow.style.display = "none";
      this.$refs.mask.style.display = "none";
    },

    //去评论
    goComment() {
      if ((this.show > 0) && (this.show < 140)) {
        //可以评论
        alert('评论成功');
        this.$refs.textArea.value = '';
        getSendDelete(api.SONG_SEND_DELETE, 1, 0, 186016, this.$refs.textArea.value);
      } else {
        //不能评论
        alert('请正确输入');
      }
    },
    //点击分页器的事件
    handleoffsetNum(num, time) {
      this.num = num;
      this.time = time;
      // console.log(this.num);
      this.getInit();

    }
  },
  mounted() {
    this.getInit();
    this.$nextTick(() => {
      this.target = this.$refs.textArea;
    });
  }
};
</script>

<style scoped lang='scss'>
@mixin befor {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  transform: rotate(45deg);
}
@mixin textOverflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipse;
}
.comment {
  width: 710px;
  padding: 34px 30px 34px 38px;
  box-sizing: border-box;
  // border: 1px solid #ddd;
  // margin-left: 50px;
  // position: relative;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    display: none;
    background: rgba(0, 0, 0, 0);
  }
  .tit {
    color: #333;
    line-height: 20px;
    margin-bottom: 10px;
    .title {
      display: inline-block;
      font-size: 20px;
      margin-right: 20px;
    }
    .subTitle {
      font-size: 14px;
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background: #c20c0c;
    vertical-align: baseline;
    margin-bottom: 20px;
  }
  .com {
    width: 100%;
    display: flex;
    // position: relative;
    .photo {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .comIptBox {
      flex: 1;
      display: flex;
      height: 60px;
      margin-bottom: 8px;
      .comIpt {
        flex: 1;
        height: 60px;
        padding: 5px;
        outline: none;
        resize: none;
        border: none;
        color: #333;
        box-sizing: border-box;
        border: 1px solid #ccc;
        overflow: auto;
      }
      .comIpt::placeholder {
        font-size: 12px;
      }
    }
    .suggester {
      position: absolute;
    }
    // .comIptBox:before {
    //   @include befor;
    //   position: absolute;
    //   left: 56px;
    //   top: 12px;
    // }
  }
  .navBox {
    margin-left: 60px;
    position: relative;
    .iconfont {
      color: #999;
      font-size: 18px;
    }
    .iconxiaolian {
      margin-right: 10px;
    }
    .num {
      position: absolute;
      right: 56px;
      line-height: 24px;
      color: #888;
    }
    .comBtn {
      float: right;
      width: 46px;
      height: 24px;
      background: #3080cc;
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 24px;
      border-radius: 5px;
    }
    .aiteShow {
      width: 150px;
      padding: 5px;
      border: 1px solid #ddd;
      position: absolute;
      z-index: 20;
      background: #fff;
      display: none;
      .aiteItem,
      .selectItem {
        width: 100%;
        height: 20px;
        color: #555;
        line-height: 20px;
        @include textOverflow;
        cursor: pointer;
      }
      .aiteItem:hover {
        background: #eee;
      }
    }
  }
  .popCon {
    width: 150px;
    height: 50px;
    border: 1px solid #ddd;
    background: #000;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 500;
    transform: translate(-50%, -50%);
  }

}

</style>
<style lang='scss'>
.suggester .suggester-list .suggester-list-item {
  height: 20px;
  line-height: 20px;
  border: none;
  strong {
    color: #555;
    font-size: 12px;
    font-style: normal;
    font-weight: normal;
  }
}
.suggester .suggester-list .suggester-list-item:hover {
  background: #eee;
}
.suggester .suggester-list .suggester-list-item.active {
  background: #eee;
}
</style>