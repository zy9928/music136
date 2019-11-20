import api from './../utils/api';
import Http from './../utils/Http';

export default {
  namespaced: true,
  state: {
    suggest: {}, // 推荐搜索

  },
  getters: {},
  mutations: {
    setSuggest(state, obj){
      state.suggest = {...obj};
    }
  },
  actions: {
    async getSuggest(context, params){
      let {data: result} = await Http.get(api.SEARCH_SUGGEST, params);
      context.commit("setSuggest", result.result);
    }
  }
}