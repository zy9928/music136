<template>
  <div id="app">
    <navBar/>
    <router-view/>
    <login-register v-if="showWindow"></login-register>
  </div>
</template>

<script>
import navBar from './components/nav-bar.vue';
import loginRegister  from "./components/login-register/login-register";
export default {

  data(){
    return{
      showWindow:false,
    }
  },
  components: {
    navBar,
    [loginRegister.name]:loginRegister
  },
  created(){
    //订阅打开登录注册窗口事件
    this.$center.$on('openWindow',(bool)=>{
      this.showWindow = bool;
    });
  }

}
</script>

<style lang="scss">
//页面主体部分公用版心
.view-wrap{
  width: 980px;
  margin: 0 auto;
}
</style>
