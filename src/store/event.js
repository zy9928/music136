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
        // //点赞
        // async likeEvent(context,params){
        //     let result = await http.get()
        // }


    }
}