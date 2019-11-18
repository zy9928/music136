<template>
  <div class="page" id="songList">
    <main class="songlistMain">
      歌单{{id}}
      <comment type="playList" :ID="id"/>
    </main>
    <pageAside kind="songList"/>
  </div>
</template>

<script>
import pageAside from './../../../components/pageAside/pageAside';
export default {
  components: {
    pageAside
  },
  props: {
    id: ''
  },
  methods: {
    rememberId(){
      this.$store.commit("aside/setSongListId", this.id);
    }
  },
  mounted(){
    this.rememberId();
  },
  updated(){
    this.rememberId();
  }
}
</script>

<style scoped lang="scss">
#songList{
  border-left: 1px solid #E9E9E9;
  border-right: 1px solid #E9E9E9;
  background-color: #fff;
  overflow: hidden;
  .songlistMain{
    width: 709px;
    float: left;
    border-right: 1px solid #E9E9E9;
  }
}

</style>