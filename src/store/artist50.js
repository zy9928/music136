import http from "../utils/Http";
import api from "../utils/api";
export default {
  namespaced: true,
  state: {
    name: '',
    picUrl: ''
  },
  mutations: {
    getMessage(state, art){
      state.name = art.name;
      state.picUrl = art.img;
    }
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
      //取出歌手信息
      var art = {
        'img': result.data.artist.picUrl,
        'name': result.data.artist.name
      }
      context.commit('getMessage', art);
      return result;
    },
    //获得歌手介绍
    async getArtistDesc(context,params){
      let result = await http.get(api.SONG_ARTIST_DESC, params);
      return result;
    }
  }
}