<template>
  <div class="page" id="play">
    <main class="playPageMain">
      <songInfo/>
      <comment type="music" :ID="id"/>
    </main>
    <pageAside kind="song"/>
  </div>
</template>

<script>
import songInfo from './../stair/songInfo';
import pageAside from './../../../components/pageAside/pageAside';
export default {
  components: {
    pageAside,
    songInfo
  },
  props: {
    id: String,
  },
  methods: {
    rememberId(){
      this.$store.commit("aside/setSongId", this.id);
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
#play{
  border-left: 1px solid #E9E9E9;
  border-right: 1px solid #E9E9E9;
  background-color: #fff;
  overflow: hidden;
  .playPageMain{
    width: 709px;
    float: left;
    border-right: 1px solid #E9E9E9;
  }
}

</style>