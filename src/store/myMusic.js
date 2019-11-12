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
    },

    //获取歌单详情(需传入歌单id))
    async getPlaylistDetail(context,id){
        let result = await http.get(api.PLAYLIST_DETAIL,{
            id
        });
        return result;
    }
  }
};
