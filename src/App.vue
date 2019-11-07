<template>
  <div id="app">
    <navBar/>
    <router-view/>
    <playBar/>
  </div>
</template>

<script>
import navBar from './components/nav-bar.vue';
import playBar from './components/playBar/playBar.vue';
export default {
  components: {
    navBar,
    playBar
  }
}
</script>

<style lang="scss">

</style>
