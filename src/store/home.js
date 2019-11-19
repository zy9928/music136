import http from "../utils/Http";
import api from "../utils/api"
export default {
  namespaced: true,
  state:{

  },
  mutations:{

  },
  actions:{
    async getBannerData(context, params){
      let result = await http.get(api.HOME_BANNER, params);
      return result;
    },
    async getRecommendResource(context){
      let result = await http.get(api.RECOMMEND_RESOURCE);
      return result;
    }
  }
}