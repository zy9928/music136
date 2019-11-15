<template>
  <my-window
    title="邮箱登录"
    :haveBottom="true"
    windowWidth="530px"
    bTextLeft="&lt;其他登录方式"
    @leftAction="handleLeft"
  >
    <template>
      <div class="login-box" slot="content">
        <div class="login-form">
          <input v-model="email" class="ipt" type="text" placeholder="请输入帐号" />
          <input v-model="password" class="ipt" type="password" placeholder="请输入密码" />

          <label for>
            <input class="check" type="checkbox" />
            自动登录
          </label>
          <a href="javascript:void(0)">忘记密码?</a>
          <my-btn @click="loginAction" fontColor="#fff" bgcolor="#2b7cc9" class="btn">登录</my-btn>
        </div>
      </div>
    </template>
  </my-window>
</template>
<script>
import MyBtn from "./my-btn";
import userService from "../../services/userService";
// console.log(MyWindow);
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  props: ["value"],
  components: {
    [MyBtn.name]: MyBtn
  },
  methods: {
    //处理登录事件
    async loginAction() {
      if (!this.email || !this.password) {
        alert("输入不能为空");
        return;
      }

      try {
        let result = await userService.loginEmail(this.email, this.password);
        if (result.data.code == "200") {
          //保存用户登录状态
          await this.$store.dispatch("user/setLogin", "true");

          //保存用户信息
          let userInfo = {};
          //用户id
          userInfo.userId = result.data.profile.userId;
          //用户昵称
          userInfo.nickname = result.data.profile.nickname;
          //用户头像url
          userInfo.avatarUrl = result.data.profile.avatarUrl;
          //用户签名
          userInfo.signature = result.data.profile.signature;

          this.$store.dispatch("user/setUserInfo", userInfo);

          //关闭当前窗口
          this.$center.$emit("openWindow", false);
          // this.$router.back();
        }
      } catch (error) {
        alert("用户名或密码错误");
      }
    },
    registerAction() {
      //处理注册事件
    },
    handleLeft() {
      this.$emit("input", "mainWindow");
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
      margin-top: 40px;
    }
  }
}
</style>