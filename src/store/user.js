import { user_info } from "../utils/localStorage";
import api from "../utils/api";
import http from "../utils/Http";

export default {
  namespaced: true,
  state: {
    isLogin: localStorage.getItem("isLogin") == "true" ? true : false,
    userInfo: user_info.get(),
    registerObject: {
      phone: "",
      password: "",
      captcha: "" //验证码
    }
  },
  getters: {},
  mutations: {
    setRegisterObject(state, registerObject) {
      state.registerObject = registerObject;
    },
    setStateLogin(state, bool) {
      state.isLogin = bool;
    },
    setStateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    async setLogin(context, bool) {
      console.log(bool);
      await localStorage.setItem("isLogin", bool);
      context.commit("setStateLogin", bool);
    },
    async setUserInfo(context, userInfo) {
      await user_info.set(userInfo);
      context.commit("setStateUserInfo", userInfo);
    },
    async logout(context) {
      console.log(context.state);
      let result = await http.get(api.LOGOUT);
      if ((result.data.code = "200")) {
        context.dispatch("setLogin", false)
        context.dispatch("setUserInfo", {});
        user_info.clear();
        return result;
      }
      return new Error();
    }
  }
};
