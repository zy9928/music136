import http from "../utils/Http";
import api from "../utils/api";
export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {
    
  },
  actions: {
    //获取歌手热门50首歌曲，但是API有问题，请求失败
    async getArtist50(context, params){
      let result = await http.get(api.SONG_ARTIST_TOP, params);
      return result;
      // console.log(result);
    },
    //获取歌手所有专辑
    async getArtistAlbum(context,params){
      let result = await http.get(api.SONG_ARTIST_ALBUM, params);
      return result;
    }
  }
}