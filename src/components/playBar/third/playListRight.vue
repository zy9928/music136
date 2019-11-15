<template>
  <div class="playListRight">
    <ul class="songWordBox" :style="ulStyle">
      <li
        class="songWordLi"
        :class="{songWordLiActive: linesNow == key}"
        v-for="(songWordLi, key) in songWord"
        :key="key"
        :data_time="songWordLi.time"
      >{{songWordLi.word}}</li>
    </ul>
  </div>
</template>

<script>
import { getSongWord } from "./../../../services/playServe.js";
import { parseLyric } from "./../util/anotherUtil.js";
import { mapState } from "vuex";
import { setInterval } from "timers";
export default {
  data() {
    return {
      lyric: "",
      linesNow: 0,
    };
  },
  computed: {
    ...mapState({
      playList: state => state.playBar.playList,
      playerSetting: state => state.playBar.playerSetting,
      playNowTime: state => state.playBar.playNowTime
    }),
    songWord() {
      this.getLyric(this.playList[this.playerSetting.index].id);
      return parseLyric(this.lyric);
    },
    ulStyle() {
      if(this.playNowTime == 0){
        this.linesNow = 0;
      }
      if(this.songWord.length == 0){
        return "";
      }
      console.log(this.playNowTime , this.songWord[this.songWord.length - 1].time)
      if (this.playNowTime*1000 < this.songWord[this.songWord.length - 1].time) {
        this.songWord.forEach(({ time }, key) => {
          if (key < this.songWord.length - 1) {
            if (
              this.playNowTime * 1000 >= time &&
              this.playNowTime * 1000 < this.songWord[key + 1].time
            ) {
              this.linesNow = key;
            }
          }
        });
      } else if(this.playNowTime*1000 >= this.songWord[this.songWord.length - 1].time){
        console.log('a');
        this.linesNow = this.songWord.length - 1;
      }
      var moveValue = 32 * this.linesNow;
      console.log(moveValue);
      return {
        transform: `translateY(${-moveValue}px)`
      };
    }
  },
  methods: {
    async getLyric(value) {
      const lyric = await getSongWord(value);
      this.lyric = lyric;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.playListRight {
  width: 422px;
  height: 100%;
  float: left;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  .songWordBox {
    margin-top: 114px;
    padding-bottom: 114px;
    transition: all 0.3s;
    .songWordLi {
      text-align: center;
      list-style: none;
      color: #929292;
      line-height: 32px;
      height: 32px;
      font-size: 12px;
      transition: all 0.3s;
    }
    .songWordLiActive {
      font-size: 14px;
      color: #f5f4f4;
    }
  }
}
</style>