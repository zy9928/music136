import http from "../utils/Http";
import api from "../utils/api"
export default {
  namespaced: true,
  state:{

  },
  mutations:{

  },
  actions:{
    //获取首页轮播图
    async getBannerData(context, params){
      let result = await http.get(api.HOME_BANNER, params);
      return result;
    },
    //获取首页每日推荐
    async getRecommendResource(context){
      let result = await http.get(api.RECOMMEND_RESOURCE);
      return result;
    },
    //获取首页新碟上架
    async getAlbumNewest(context){
      let result = await http.get(api.ALBUM_NEWEST);
      return result;
    },
    //获取首页榜单
    async getTopList(context,params){
      let result = await http.get(api.TOP_LIST, params);
      return result;
    },
    //获取首页入驻歌手
    async getArtistList(context,params){
      let result = await http.get(api.ARTIST_LIST, params);
      return result;
    },
    //获取首页热门主播
    async getTopPopular(context){
      let result = await http.get(api.TOP_POPULAR);
      return result;
    }
  }
}