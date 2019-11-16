<template>
  <aside class="pageAside">

    <listStyle data_kind="album">
      <h4 class="asideTitle">包含这首歌的歌单</h4>
    </listStyle>
    <playStyle>
      <h4 class="asideTitle">相似歌曲</h4>
    </playStyle>
    <tableStyle data_kind="singer">
      <h4 class="asideTitle">喜欢这首歌的人</h4>
    </tableStyle>
    <section class="goDownApp">
      <h4 class="asideTitle">网易云音乐多端下载</h4>
      <div class="goDownAppBox">

      </div>
    </section>
  </aside>
</template>

<script>
import listStyle from './stair/listStyle';
import playStyle from './stair/playStyle';
import tableStyle from './stair/tableStyle';
export default {
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
      
    }
  }
}
</style>