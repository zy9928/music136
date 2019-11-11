import http from "../utils/Http";
import api from "../utils/api";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    //获取用户歌单
    async getPlaylist(context, uid) {
      let result = http.get(api.PLAYLIST, {
        uid
      });
      return result;
    }
  }
};
