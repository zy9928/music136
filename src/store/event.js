import http from "../utils/Http";
import api from "../utils/api";

export default{
    namespaced:true,
    state:{
        lasttime: localStorage.getItem('lasttime')?JSON.parse(localStorage.getItem('lasttime')):-1
    },
    getters:{

    },
    mutations:{
        lasttimeState(state,lasttime){
            state.lasttime = lasttime;
        }
    },
    actions:{
        async getEvents(context,params){
            console.log(params);
            let result  = await http.get(api.EVENT,params);    
            return result;
        },
        async getArtists(context,params){
            let result  = await http.get(api.TOP_ARTIST,params);
            return result;
        },
        async setLasttime(context,lasttime){
            context.commit("lasttimeState",lasttime);
            await localStorage.setItem("lasttime",lasttime);

        },
        //动态点赞
        async likeEvent(context,params){
            let result = await http.get(api.RESOURCE_LIKE,params);
            console.log(result);
            if(result.data.code=="200"){
                return result;
            }else{
                throw new Error("操作失败");
            }
        }
    }
}