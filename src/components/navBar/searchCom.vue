<template>
  <div class="searchWarp">
    <div
      class="searchSuggestBox"
      v-if="dataFocu && suggest.order && suggest.order.length != 0"
    >{{suggest}}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    dataFocu: ""
  },
  computed: {
    ...mapState({
      suggest: state => state.search.suggest
    })
  }
};
</script>

<style scoped lang="scss">
.searchWarp {
  .searchSuggestBox {
    position: absolute;
    width: 240px;
    border-radius: 3px;
    border: 1px solid #bebebe;
    min-height: 20px;
    background: #fff;
    left: 0;
    top: 55px;
    z-index: 100;
  }
}
</style>