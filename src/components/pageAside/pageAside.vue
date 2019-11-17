<template>
  <aside class="pageAside">

    <tableStyle v-if="kind == 'song' || kind == 'songList' || kind == 'singer'" :data_kind="kind">
      <h4 class="asideTitle">{{titleTable}}</h4>
    </tableStyle>

    <listStyle v-if="kind == 'song' || kind == 'songList' || kind == 'album'" :data_kind="kind">
      <h4 class="asideTitle">{{listTitle}}</h4>
    </listStyle>

    <playStyle v-if="kind == 'song'">
      <h4 class="asideTitle">相似歌曲</h4>
    </playStyle>

    <section class="goDownApp">
      <h4 class="asideTitle">网易云音乐多端下载</h4>
      <div class="goDownAppBox">
        <div class="link">
          <a class="iosApp"></a>
          <a class="pcApp"></a>
          <a class="androidAPP"></a>
        </div>
      </div>
      <p class="linkText">同步歌单，随时畅听320k好音乐</p>
    </section>
  </aside>
</template>

<script>
import listStyle from './stair/listStyle';
import playStyle from './stair/playStyle';
import tableStyle from './stair/tableStyle';
export default {
  props: {
    kind: "",
  },
  computed: {
    titleTable(){
      if(this.kind == "song"){
        return '喜欢这首歌的人'
      }else if(this.kind == "songList"){
        return '喜欢这个歌单的人'
      }else if(this.kind == "singer"){
        return '相似歌手'
      }
    },
    listTitle(){
      if(this.kind == "song"){
        return '包含这首歌的歌单'
      }else if(this.kind == "songList"){
        return '相关推荐'
      }else if(this.kind == "album"){
        return 'Ta的其他热门专辑'
      }
    }
  },
  components: {
    listStyle,
    playStyle,
    tableStyle
  }
};
</script>

<style scoped lang="scss">
.pageAside {
  float: left;
  width: 270px;
  padding: 20px 30px 0;
  box-sizing: border-box;
  .asideTitle{
    border-bottom: 1px solid #CCCCCC;
    font-size: 14px;
    font-weight: bold;
    line-height: 30px;
    margin: 10px 0;
  }
  .goDownApp{
    .goDownAppBox{
      .link{
        padding: 10px 5px;
        display: flex;
        justify-content: space-between;
        &>a{
          display: inline-block;
          height: 48px;
          width: 31px;
          vertical-align: middle;
          background-image: url(./../../assets/zy_sprite.png);
          background-position-y: -392px;
          &:hover{
            background-position-y: -472px;
          }
        }
        .iosApp{
          background-position-x: -6px;
        }
        .pcApp{
          background-position-x: -72px;
          width: 61px;
        }
        .androidAPP{
          background-position-x: -163px;
        }
      }
    }
    .linkText{
      padding-top: 10px;
      color: #999;
    }
  }
}
</style>