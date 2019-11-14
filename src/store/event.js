import http from "../utils/Http";
import api from "../utils/api";

export default{
    namespaced:true,
    state:{

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
        }
    }
}