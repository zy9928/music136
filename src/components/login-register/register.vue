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
          <input class="ipt" type="text" placeholder="请输入手机号" />
          <input class="ipt" type="password" placeholder="设置登录密码，不少于6位" />

          <my-btn fontColor="#fff" bgColor="#2b7cc9" class="btn">下一步</my-btn>
        </div>
      </div>
    </template>
  </my-window>
</template>
<script>
import MyWindow from "./my-window";
import MyBtn from "./my-btn";
console.log(MyWindow);
export default {
  props: ["value"],
  components: {
    [MyWindow.name]: MyWindow,
    [MyBtn.name]: MyBtn
  },
  methods: {
    //处理登录事件
    loginAction() {
      alert("点击了");
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
      margin-top: 20px;
    }
  }
}
</style>