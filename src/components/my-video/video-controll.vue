<template>
  <div class="vue-controll"></div>
</template>

<script>
export default {
  name: "vue-control",
  components: {
    "video-progress": () => import("./video-progress")
  }
};
</script>

<style scoped lang="scss">
</style>