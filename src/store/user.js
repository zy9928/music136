export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem('isLogin')=="true"?true:false,
    userInfo: {},
    registerObject: {
      phone: "",
      password: "",
      captcha:""//验证码
    }
  },
  mutations: {
    setRegisterObject(state, registerObject) {
      state.registerObject = registerObject;
    }
  },
  actions: {
    async setLogin(bool){
      await localStorage.setItem('isLogin',bool);
    }
  }
};
