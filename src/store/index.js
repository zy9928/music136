import Vue from 'vue'
import Vuex from 'vuex'
import user from "./user";
import myMusic from "./myMusic";
import playBar from "./playBar";
import event from "./event";
import aside from './aside';
import artist50 from './artist50'
import songInfo from './songInfo';
import home from './home';
import songList from './songList';
import albumInfo from './albumInfo';
import video from "./video";
import search from './search';

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
    aside,
    artist50,
    songInfo,
    home,
    songList,
    albumInfo,
    video,
    search,
  }
})
