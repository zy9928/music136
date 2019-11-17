import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user";
import myMusic from "./myMusic";
import playBar from "./playBar";
import event from "./event";
import artist50 from './artist50'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    myMusic,
    playBar,
    event,
    artist50
  }
})
