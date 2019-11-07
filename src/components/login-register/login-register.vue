<template>
  <div class="login-register">
    <!-- <div class="window">
      <div class="window-main">
        <div class="window-main-header">
          <h3>手机登录</h3>
          <span>X</span>
        </div>
        <div class="window-main-content">
          <slot name="content" />
        </div>
        <div class="window-main-bottom">
          <a href class="window-main-bottom-left">&lt;其他登录方式</a>
          <a href class="window-main-bottom-right">没有账号?免费注册&gt;</a>
        </div>
      </div>
    </div> -->
    <component :is="currentWindow"/>
 
  </div>
</template>
<script>
import mainWindow from "./mainWindow";
export default {
  name: "login-register",
  data(){
      return {
          currentWindow:mainWindow
      }
  },
  components:{
    mainWindow
  }
};
</script>

<style scoped>

</style>