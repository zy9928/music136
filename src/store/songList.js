import api from "./../utils/api";
import Http from "./../utils/Http";
import TimeHandle from './../utils/TimeHandle';

export default {
  namespaced: true,
  state: {
    listInfo: {},
    createrInfo: {},
    songList: []
  },
  getters: {},
  mutations: {
    setListInfo(state, obj) {
      state.listInfo = { ...obj };
    },
    setCreaterInfo(state, obj) {
      state.createrInfo = { ...obj };
    },
    setSongList(state, arr) {
      state.songList = [...arr];
    }
  },
  actions: {
    async getSongListInfo(context, params) {
      let { data: result } = await Http.get(api.SONG_LIST_INFO, params);
      // 为啥不行
      // var str = result.playlist.description.replace("\n", "<br/>");
      var str = result.playlist.description.split("\n");
      str = str.join("<br/>")
      var objList = {
        img: result.playlist.coverImgUrl,
        name: result.playlist.name,
        id: result.playlist.id,
        // 简介
        description: str,
        // 标签
        tags: result.playlist.tags,
        // 播放次数
        playCount: result.playlist.playCount,
        // 分享次数
        shareCount: result.playlist.shareCount,
        // 评论次数
        commentCount: result.playlist.commentCount,
        // 收藏次数
        subscribedCount: result.playlist.subscribedCount
      };
      context.commit("setListInfo", objList);
      var objCreater = {
        id: result.playlist.creator.userId,
        name: result.playlist.creator.nickname,
        img: result.playlist.creator.avatarUrl,
        creatTime: TimeHandle.getYMD(result.playlist.createTime)
      };
      context.commit("setCreaterInfo", objCreater);
      var arrSong = [];
      result.playlist.tracks.forEach(song => {
        var singers = [];
        song.ar.forEach((singer, key) => {
          if (key == song.ar.length - 1) {
            singers.push({
              id: singer.id,
              name: singer.name
            });
          } else {
            singers.push({
              id: singer.id,
              name: singer.name + "/"
            });
          }
        });
        arrSong.push({
          name: song.name,
          id: song.id,
          album: {
            name: song.al.name,
            id: song.al.id
          },
          time: TimeHandle.getMS(song.dt),
          singers: singers,
          mv: song.mv
        });
      });
      context.commit("setSongList", arrSong);
    }
  }
};
