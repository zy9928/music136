<template>
  <my-window title="手机号注册" :haveBottom="false" windowWidth="530px">
    <template slot="content">
      <div class="nick-wrap">
        <div class="nick-box">
         
            <h1>取一个昵称让大家记住你</h1>
            <div class="ipt-box">
                <input v-model="nickname" type="text" placeholder="昵称不少于4个字母或两个汉字">
            </div>
          <my-btn @click="registerAction" fontColor="#fff" :bgColor="bgColor" class="btn">{{btnText}}</my-btn>
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
      bgColor: "#2b7cc9",
      btnText: "开启音乐",
      nickname:''
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
   async registerAction(){
        if(!this.nickname){
            alert('请输入昵称');
            return;
        }
        let phone = this.registerObject.phone;
        let passsword = this.registerObject.password;
        let code = this.registerObject.captcha;
        console.log(phone,passsword,code,this.nickname);
        
        try {
             let result = await userService.register(code,phone,passsword,this.nickname);
             if(result.data.code=='200'){
                 //注册成功，直接登录
                 this.$center.$emit('openWindow',false);
             }
        } catch (error) {
            alert('该手机号已注册');
             this.$center.$emit('openWindow',false);
        }
        


    }
  }
};
</script>
<style scoped lang="scss">
.nick-wrap {
  padding: 30px 0 43px;
  color: #666;
  .nick-box {
    width: 220px;
    margin: 0 auto;
    h1{
        text-align: center;
        font-size: 12px;
    }
    .ipt-box{
        margin-top: 15px;
        input{
            outline: none;
            height: 24px;
            font-size:12px;
            border:1px solid #ddd;
            width: 100%;
        }
    }
    .btn {
      margin-top: 20px;
    }
  }
}
</style>