<template>
  <div>
    <p class="pagePlayCtrl">
      <span class="playBtn">
        <i class="el-icon-video-play" @click="play"></i>
        <i title="播放" @click="play">播放</i>
        <i class="el-icon-plus addBtn" title="添加到播放列表" @click="addPlay"></i>
      </span>
      <span class="likeBtn" title="收藏">
        <i class="el-icon-star-off"></i>收藏
      </span>
      <span class="shareBtn" title="分享">
        <i class="el-icon-share"></i>分享
      </span>
      <span class="downBtn" title="下载">
        <i class="el-icon-download"></i>下载
      </span>
      <a href="#comment" class="commentBtn" title="评论">
        <i class="el-icon-s-comment"></i>评论
      </a>
    </p>
    <div class="songWordBox">
      <ul
        class="songWordUl"
        :class="{songWordUlHid: wordIsHid}"
        v-if="typeof songWord != 'string'"
        ref="wordUl"
      >
        <li class="songWordLi" v-for="(item, key) in songWord" :key="key">{{item.word}}</li>
      </ul>
      <span class="songWordCtrlBtn" v-if="isHidBtn" @click="ctrlHid">展开<i :class="{'el-icon-arrow-down': isHid, 'el-icon-arrow-up': !isHid}"></i></span>
      <span class="songWord" v-if="typeof songWord == 'string'">{{songWord}}</span>
    </div>
    <div class="anotherInfo">
      <a href="#" class="error">报错</a>
      <p class="lrcUserBox" v-if="lyricUser">贡献歌词者： <router-link :to="`/user/${lyricUser.id}`">{{lyricUser.name}}</router-link></p>
    </div>
  </div>
</template>

<script>
import { getSongWord } from "./../../../services/playServe.js";
import { parseLyric } from "./../../../components/playBar/util/anotherUtil.js";
export default {
  data() {
    return {
      songWord: [],
      lyricUser: "",
      wordIsHid: true,
      isHid: true
    };
  },
  props: {
    id: ""
  },
  computed: {
    isHidBtn() {
      if (typeof this.songWord != "string") {
        if (this.songWord.length > 12) {
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }
    }
  },
  methods: {
    play() {
      this.$store.commit("playBar/setPlayNowId", this.id);
    },
    addPlay() {
      this.$store.commit("playBar/setAddSongId", this.id);
    },
    async geWord() {
      let reslute = await getSongWord(this.id);
      if (reslute.lyricUser) {
        this.lyricUser = {
          name: reslute.lyricUser.nickname,
          id: reslute.lyricUser.id
        };
      } else {
        this.lyricUser = null;
      }
      if (reslute.lrc) {
        if (reslute.lrc.lyric == "") {
          this.songWord = "纯音乐，请欣赏";
        } else {
          this.songWord = parseLyric(reslute.lrc.lyric);
        }
      } else {
        this.songWord = "纯音乐，请欣赏";
      }
      this.$nextTick();
    },
    ctrlHid(){
      this.wordIsHid = !this.wordIsHid;
      this.isHid = !this.isHid;
    }
  },
  watch: {
    id(newVal, oldVal) {
      if (this.id) {
        this.geWord();
      }
    }
  },
  mounted() {
    if (this.id) {
      this.geWord();
    }
  }
  // 为啥无限循环
  /* updated(){
    if(this.id){
      this.geWord();
    }
  } */
};
</script>

<style scoped lang="scss">
.pagePlayCtrl {
  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  & > span,
  & > a {
    display: inline-block;
    font-size: 16px;
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
.songWordBox {
  .songWordUl {
    overflow: hidden;
    .songWordLi {
      line-height: 25px;
      color: #555;
    }
  }
  .songWordUlHid {
    max-height: 300px;
  }
  .songWordCtrlBtn{
    display: block;
    color: #3289CB;
  }
}
.anotherInfo{
  color: #555;
  .error{
    display: block;
    text-align: right;
    text-decoration: underline;
    color: #999;
  }
  .lrcUserBox{
    text-align: right;
    &>a{
      color: #3080CC;
    }
  }
}
</style>