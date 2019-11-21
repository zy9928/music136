import api from './../utils/api';
import Http from './../utils/Http';

export default {
  namespaced: true,
  state: {
    suggest: {}, // 推荐搜索
    result: {}, // 搜索结果
  },
  getters: {},
  mutations: {
    setSuggest(state, obj){
      state.suggest = {...obj};
    },
    setResult(state, obj){
      state.result = {...obj};
    }
  },
  actions: {
    async getSuggest(context, params){
      let {data: result} = await Http.get(api.SEARCH_SUGGEST, params);
      context.commit("setSuggest", result.result);
    },
    async getSearchResult(context, params){
      let {data: result} = await Http.get(api.SEARCH, params);
      // 歌词需要根据歌曲id再请求一次
      let obj = {
        data: result.result.songs/*单曲/歌词*/ || result.result.albums/*专辑*/ || result.result.artists/*歌手*/ || result.result.playlists/*歌单*/ || result.result.userprofiles/*用户*/ || result.result.mvs/*mv*/ || result.result.djRadios/*电台*/ || result.result.videos/*视频*/,
        count: result.result.songCount/*单曲/歌词*/ || result.result.albumCount/*专辑*/ || result.result.artistCount/*歌手*/ || result.result.playlistCount/*歌单*/ || result.result.userprofileCount/*用户*/ || result.result.mvCount/*mv*/ || result.result.djRadiosCount/*电台*/ || result.result.videoCount/*视频*/,
      }
      context.commit("setResult", obj);
    }
  }
}