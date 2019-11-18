import http from "../utils/Http";
import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    songInfo: {}
  },
  getters: {},
  mutations: {
    setSongInfo(state, obj){
      state.songInfo = {...obj};
    }
  },
  actions: {
    async getSongInfo(context, params){
      let {data: result} = await http.get(api.SONG_INFO, params);
      context.commit("setSongInfo", result.songs[0]);
    }
  }
}