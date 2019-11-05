<template>
  <div id="app">
    <div id="nav">
      <navBar/>
    </div>
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
