<template>
  <div id="app">
    <navBar />
    <div id="page">
      <router-view />
    </div>
    <playBar />
    <login-register v-show="showWindow"></login-register>
  </div>
</template>

<script>
import navBar from "./components/nav-bar.vue";
import playBar from "./components/playBar/playBar.vue";
import loginRegister from "./components/login-register/login-register";
export default {
  data() {
    return {
      showWindow: false
    };
  },
  components: {
    navBar,
    playBar,
    [loginRegister.name]: loginRegister
  },
  created() {
    //订阅打开登录注册窗口事件
    this.$center.$on("openWindow", bool => {
      this.showWindow = bool;
    });
  }
};
</script>

<style lang="scss">
body {
  background: #f5f5f5;
}
html,
body {
  width: 100%;
  height: 100%;
}
//页面主体部分公用版心
.view-wrap {
  width: 980px;
  margin: 0 auto;
}
#page {
  min-width: 1135px;
}
.page{
  width: 980px;
  margin: 0 auto;
}
</style>
