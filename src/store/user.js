import {user_info} from "../utils/localStorage";

export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem('isLogin')=="true"?true:false,
    userInfo: user_info.get(),
    registerObject: {
      phone: "",
      password: "",
      captcha:""//验证码
    }
  },
  getters:{

  },
  mutations: {
    setRegisterObject(state, registerObject) {
      state.registerObject = registerObject;
    }
  },
  actions: {
    async setLogin(context,bool){
      console.log(bool);
      await localStorage.setItem('isLogin',bool);
    },
    async setUserInfo(context,userInfo){
      await user_info.set(userInfo);
    }
  }
};
