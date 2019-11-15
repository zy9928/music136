<template>
  <my-window
    title="手机号注册"
    :haveBottom="true"
    windowWidth="530px"
    bTextLeft="&lt;返回登录"
    @leftAction="handleLeft"
  >
    <template slot="content">
      <div class="code-wrap">
        <div class="code-box">
          <span>你的手机号:&nbsp;</span>
          <b>{{phone}}</b>
          <p>为了安全，我们会发送短信验证码</p>
          <div class="ipt-box">
            <input maxlength="1" v-model="code1" type="text" />
            <input maxlength="1" v-model="code2" type="text" />
            <input maxlength="1" v-model="code3" type="text" />
            <input maxlength="1" v-model="code4" type="text" />
          </div>
          <p @click="sendCodeAction" class="code-time" :class="{canSend:canSend}">{{second}}</p>
          <my-btn @click="verifyAction" fontColor="#fff" :bgColor="bgColor" class="btn">{{btnText}}</my-btn>
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
  created() {
    console.log("创建了");
    this.timer = setInterval(this.handleTimer, 1000);
  },
  data() {
    return {
      bgColor: "#2b7cc9",
      btnText: "下一步",
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      canSend: false, //能够发送验证码标志位
      timer: null,
      second: "60s"
    };
  },
  props: ["value"],
  components: {
    [MyBtn.name]: MyBtn
  },
  computed: {
    ...mapState({
      registerObject: state => state.user.registerObject
    }),
    phone() {
      return this.registerObject.phone.replace(
        /^(\d{4})\d{4}(\d+)/,
        "$1****$2"
      );
    }
  },
  methods: {
    //验证验证码
    async verifyAction() {
      //处理注册事件
      if(!this.code1||!this.code2||!this.code3||!this.code4){
           alert("请输入验证码"); 
           return;
      }

      let code = this.code1+this.code2+this.code3+this.code4;

      let result = await userService.verifyCode(this.registerObject.phone,code);

      if(result.data.code=='200'){
        //跳转前将验证码加入到仓库中
        this.registerObject.captcha = code;
        this.$store.commit('user/setRegisterObject',this.registerObject)
        //跳转到到昵称页面
         this.$emit('input','registerNick');
      }else{
        alert('验证码错误');
      }

    
    },
    handleLeft() {
      this.$emit("input","mainWindow");
    },
    //下一步
    async nextAction() {
      alert("下一步验证");
    },
    //重新发送验证码
    async sendCodeAction() {
      if (!this.canSend) {
        return false;
      }
      console.log(this.registerObject.phone);
      let result = await userService.sendCode(this.registerObject.phone);
      if (result&&result.data.code == "200") {//发送验证码成功，相关值初始化
        this.canSend=false;
        this.second = '60s';
      }
      this.timer = setInterval(this.handleTimer,1000);
    },
    handleTimer() {
      this.second = parseInt(this.second) - 1 + "s";
      if (this.second == "0s") {
        clearInterval(this.timer);
        this.second = "重新发送";
        this.canSend = true;
      }
    }
  }
};
</script>
<style scoped lang="scss">
.code-wrap {
  padding: 30px 0 43px;
  color: #666;
  .code-box {
    width: 220px;
    margin: 0 auto;
    p {
      font-size: 12px;
      color: #999;
      margin-top: 5px;
    }
    .ipt-box {
      width: 220px;
      height: 30px;
      overflow: hidden;
      margin-top: 10px;

      input {
        width: 38px;
        height: 17px;
        font-size: 24px;
        padding: 5px 6px 6px;
        border: 0;
        border-bottom: 2px solid #ccc;
        float: left;
        margin-right: 5px;
        outline: none;
      }
    }

    .code-time {
      text-align: right;
      padding-right: 7px;
    }
    .canSend {
      color: #0c73c2;
      cursor: pointer;
    }
    .btn{
      margin-top: 12px;
    }
  }
}
</style>