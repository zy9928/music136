<template>
  <my-window title="登录" :haveBottom="false" windowWidth="530px">
    <template slot="content">
      <div class="main-view">
        <div class="zy_tx">
          <div class="main-view-left">
            <div class="main-view-left-img">
              <img src="../../assets/computer.jpg" alt />
            </div>
            <div class="main-view-left-btn">
              <my-btn @click="loginAction" class="login" fontColor="#fff" bgColor="#3282ce">手机号登录</my-btn>
              <my-btn
                @click="registerAction"
                class="register"
                fontColor="#333"
                bgColor="##f4f4f4"
              >注册</my-btn>
            </div>
          </div>
          <div class="main-view-right">
            <ul>
              <li>
                <img src="../../assets/wechat.jpg" alt />
                <span>微信登录</span>
              </li>
              <li>
                <img src="../../assets/qq.jpg" alt />
                <span>QQ登录</span>
              </li>
              <li>
                <img src="../../assets/webo.jpg" alt />
                <span>微博登录</span>
              </li>
              <li @click="emailLoginAction"> 
                <img src="../../assets/yi.jpg" alt />
                <span>网易邮箱帐号登陆</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </my-window>
</template>

<script>
// import MyWindow from "./my-window";
import MyBtn from "./my-btn";
// console.log(MyWindow);
export default {
  props:['value'],
  components: {
    [MyBtn.name]: MyBtn
  },
  methods: {
    //处理登录事件
    loginAction() {
      this.$emit('input','phoneLogin');
    },
    registerAction() {
      //处理注册事件
      this.$emit('input','register');
    },
    emailLoginAction(){
       this.$emit('input','emailLogin');
    }
  }
};
</script>
<style scoped lang="scss">
.window .window-main-content .main-view {
  // height: 365px;
  padding-bottom: 30px;
}

.main-view-left {
  width: 300px;
  border-right: 1px solid #ddd;
  margin-top: 44px;
  overflow: hidden;
  float: left;

  &-img {
    width: 223px;
    height: 115px;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  &-btn {
    width: 246px;
    margin-top: 26px;
    margin: 0 auto;
    margin-top: 26px;
    // margin-bottom: 37px;
    .register {
      margin-top: 10px;
    }
  }
}

.main-view-right {
  float: left;
  height: 100px;
  margin-top: 44px;
  margin-left: 42px;
  ul{
    li{
      height: 43px;
      line-height: 43px;
      margin-bottom: 15px;
      cursor: pointer;
      img{
        float: left;
      }
      span{
        font-size: 14px;
        float: left;
        color: #333;
        margin-left:16px;
      }
    }
  }
}
</style>