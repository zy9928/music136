import http from "../utils/Http";
import api from "../utils/api";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getVideo(context,id){
        let result = await http.get(api.VIDEO,{
            id
        });
        if(result.data.code=='200'){
            return result;
        }else{
            return new Error("获取失败");
        }
    }
  }
};
