<template>
  <div class="page" id="play">
    <main class="playPageMain">
      {{id}}
      <comment/>
    </main>
    <pageAside/>
  </div>
</template>

<script>
import pageAside from './../../../components/pageAside/pageAside';
export default {
  components: {
    pageAside
  },
  props: {
    id: String,
  },
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