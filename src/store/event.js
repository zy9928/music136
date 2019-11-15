import http from "../utils/Http";
import api from "../utils/api";

export default{
    namespaced:true,
    state:{
        lasttime: localStorage.getItem('lasttime')?localStorage.getItem('lasttime'):-1
    },
    getters:{

    },
    mutations:{

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
            localStorage.setItem("lasttime",lasttime);
        }
    }
}