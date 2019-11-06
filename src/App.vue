<template>
  <div id="app">
    <navBar/>
    <router-view/>
  </div>
</template>

<script>
import navBar from './components/nav-bar.vue';
export default {
  components: {
    navBar,
  }
}
</script>

<style lang="scss">

</style>
