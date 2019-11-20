<template>
  <div class="login-register">
    <keep-alive>
      <component v-model="currentWindow" :is="currentWindow" />
    </keep-alive>
  </div>
</template>
<script>
import mainWindow from "./mainWindow";
import phoneLogin from "./phoneLogin";
import emailLogin from "./emailLogin";
import register from "./register";
import registerCode from "./register-code";
import registerNick from "./register-nick";
import AddEvent from "../../page/Friend/root/children/AddEvent";
import AddMusic from "../../page/Friend/root/children/AddMusic";

export default {
  name: "login-register",
  data() {
    return {
      currentWindow: "mainWindow"
    };
  },
  created() {
    this.$center.$on("changeWindow", name => {
      this.currentWindow = name;
      console.log(this.currentWindow);
      console.log("触发了");
    });
  },
  components: {
    mainWindow,
    phoneLogin,
    emailLogin,
    register,
    registerCode,
    registerNick,
    AddEvent,
    AddMusic
  }
};
</script>

<style scoped>
</style>