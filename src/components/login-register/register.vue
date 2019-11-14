<template>
  <my-window
    title="手机号注册"
    :haveBottom="true"
    windowWidth="530px"
    bTextLeft="&lt;返回登录"
    @leftAction="handleLeft"
  >
    <template>
      <div class="login-box" slot="content">
        <div class="login-form">
          <input v-model="phone" class="ipt" type="text" placeholder="请输入手机号" />
          <input v-model="password" class="ipt" type="password" placeholder="设置登录密码，不少于6位" />

          <my-btn @click="nextAction" fontColor="#fff" :bgColor="bgColor" class="btn">{{btnText}}</my-btn>
        </div>
      </div>
    </template>
  </my-window>
</template>
<script>
import MyBtn from "./my-btn";
import { mapState } from "vuex";
import userService from "../../services/userService";
// console.log(MyWindow);
export default {
  data() {
    return {
      phone: "",
      password: "",
      bgColor: "#2b7cc9",
      btnText: "下一步"
    };
  },
  props: ["value"],
  components: {
    [MyBtn.name]: MyBtn
  },
  computed: {
    ...mapState({
      registerObject: state => state.user.registerObject
    })
  },
  methods: {
    registerAction() {
      //处理注册事件
    },
    handleLeft() {
      this.$emit("input", "mainWindow");
    },
    //下一步
   async  nextAction() {
      this.$store.commit("user/setRegisterObject", {
        phone: this.phone,
        password: this.password
      });
      this.btnText = "发送中...";

      let result  = await userService.sendCode(this.phone);
      console.log(result);

      if(result.data.code=='200'){
        //跳转到输入验证码页面
        this.$emit('input','registerCode');
      }

    }
  }
};
</script>
<style scoped lang="scss">
.login-box {
  padding: 30px 0 43px;
  color: #666;
  .login-form {
    width: 220px;
    margin: 0 auto;
    .ipt {
      width: 100%;
      height: 30px;
      padding-left: 5px;
      line-height: 30px;
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing: border-box;
      outline: none;
      margin-bottom: 10px;
    }
    label {
      float: left;
    }
    .check {
      vertical-align: middle;
      margin-right: 6px;
    }
    a {
      float: right;
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>