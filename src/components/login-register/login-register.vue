<template>
  <div class="login-register">
    <component v-model="currentWindow" :is="currentWindow"/>
  </div>
</template>
<script>
import mainWindow from "./mainWindow";
import phoneLogin from "./phoneLogin";
import emailLogin from "./emailLogin";
import register from "./register";
import registerCode from "./register-code";
import registerNick from "./register-nick";

export default {
  name: "login-register",
  data(){
      return {
          currentWindow:'mainWindow'
      }
  },
  components:{
    mainWindow,
    phoneLogin,
    emailLogin,
    register,
    registerCode,
    registerNick
  }
};
</script>

<style scoped>

</style>