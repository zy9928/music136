<template>
  <div id="comment-list">
    <div class="comment-list-title">
      <h1>{{title}}</h1>
      <div class="comment-list-main">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: Array,
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
#comment-list {
  text-align: left;
  margin-top: 30px;
  h1 {
    color: #333;
    height: 20px;
    border-bottom: 1px solid #cfcfcf;
  }
}
</style>