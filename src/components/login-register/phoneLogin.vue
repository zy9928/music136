<template>
  <my-window
    title="手机号登录"
    :haveBottom="true"
    windowWidth="530px"
    bTextLeft="&lt;其他登录方式"
    bTextRight="没有帐号？免费注册&gt;"
    @leftAction="handleLeft"
    @rightAction="handleRight"
  >
    <template>
      <div class="login-box" slot="content">
        <div class="login-form">
          <input v-model="phone" class="ipt" type="text" placeholder="请输入手机号" />
          <input v-model="password" class="ipt" type="password" placeholder="请输入密码" />

          <label for>
            <input class="check" type="checkbox" />
            自动登录
          </label>
          <a href="javascript:void(0)">忘记密码?</a>
          <my-btn @click="loginAction" fontColor="#fff" bgColor="#2b7cc9" class="btn">登录</my-btn>
        </div>
      </div>
    </template>
  </my-window>
</template>
<script>
import MyWindow from "./my-window";
import MyBtn from "./my-btn";
import userService from "../../services/userService";
console.log(MyWindow);
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  props: ["value"],
  components: {
    [MyWindow.name]: MyWindow,
    [MyBtn.name]: MyBtn
  },
  computed:{

  },
  methods: {
    //处理登录事件
    async loginAction() {
      if (!this.phone || !this.password) {
        alert("输入不能为空");
        return;
      }

      try {
        let result = await userService.loginPhone(this.phone, this.password);
        if(result.data.code=="200"){
          //保存用户登录状态
          await this.$store.dispatch('user/setLogin',"true");

          //保存用户信息
          let  userInfo = {};
          //用户id
          userInfo.userId = result.data.profile.userId;
          //用户昵称
          userInfo.nickname = result.data.profile.nickname;
          //用户头像url
          userInfo.avatarUrl = result.data.profile.avatarUrl;
          this.$store.dispatch('user/setUserInfo',userInfo);

          //关闭当前窗口
          this.$center.$emit('openWindow',false);
          // this.$router.back();
        }
      } catch (error) {
          alert('用户名或密码错误');
          console.log(error);
      }
    },
    registerAction() {
      //处理注册事件
    },
    handleLeft() {
      this.$emit("input", "mainWindow");
    },
    handleRight() {
      this.$emit("input", "register");
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