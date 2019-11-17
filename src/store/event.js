import http from "../utils/Http";
import api from "../utils/api";

export default {
  namespaced: true,
  state: {
    lasttime: localStorage.getItem("lasttime")
      ? JSON.parse(localStorage.getItem("lasttime"))
      : -1,
    comments: {}, //最新评论
    hotComments: {} //最热评论
  },
  getters: {},
  mutations: {
    lasttimeState(state, lasttime) {
      state.lasttime = lasttime;
    },
    setComments(state, {comments, threadId}) {
      state.comments = {
        ...state.comments,
        ...{
          [threadId]:comments
        }
      }
    },
    setHotComments(state, {hotComments, threadId}) {
      state.hotComments = {
        ...state.hotComments,
        ...{
          [threadId]:hotComments
        }
      }
    }
  },
  actions: {
    async getEvents(context, params) {
      console.log(params);
      let result = await http.get(api.EVENT, params);
      return result;
    },
    async getArtists(context, params) {
      let result = await http.get(api.TOP_ARTIST, params);
      return result;
    },
    async setLasttime(context, lasttime) {
      context.commit("lasttimeState", lasttime);
      await localStorage.setItem("lasttime", lasttime);
    },
    //动态点赞
    async likeEvent(context, params) {
      let result = await http.get(api.RESOURCE_LIKE, params);
      console.log(result);
      if (result.data.code == "200") {
        return result;
      } else {
        throw new Error("操作失败");
      }
    },
    //获取动态评论
    async getEventComment(context, threadId) {
      let result = await http.get(api.COMMENT_EVENT, {
        threadId
      });

      if (result.data.code == "200") {
        return result;
      } else {
        return new Error("获取失败");
      }
    },
    //发送或删除评论
    async sendOrDelComment(context,params){
      let result  = await http.get(api.SONG_SEND_DELETE,params);
      if(result.data.code=='200'){
        return result;
      }else{
        return new Error("发送失败");
      }
    }


  }
};
