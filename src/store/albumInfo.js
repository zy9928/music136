import api from "./../utils/api";
import Http from "./../utils/Http";
import TimeHandle from "./../utils/TimeHandle";

const computed = (num, str) => {
  if (num == 0) {
    return str;
  } else if (num > 0 && num < 10000) {
    return num;
  } else if (num >= 10000) {
    return `${Math.floor(num / 10000)}万`;
  }
};

export default {
  namespaced: true,
  state: {
    albumInfo: {},
    albumSong: [],
    albumSongs: []
  },
  getters: {},
  mutations: {
    setalbumInfo(state, obj) {
      state.albumInfo = { ...obj };
    },
    setalbumSong(state, arr) {
      state.albumSong = [...arr];
    },
    setalbumSongs(state, arr) {
      state.albumSongs = [...arr];
    }
  },
  actions: {
    async getalbum(context, params) {
      let { data: result } = await Http.get(api.ALBUM_INFO, params);
      if(result.album.description){
        var str = result.album.description.split("\n");
        str = str.join("<br/>")
      }else{
        var str = '';
      }
      let singers = [];
      result.album.artists.forEach((item, key) => {
        if (key == result.album.artists.length - 1) {
          singers.push({
            name: item.name,
            id: item.id
          });
        } else {
          singers.push({
            name: item.name + "/",
            id: item.id
          });
        }
      });
      let info = {
        img: result.album.picUrl,
        name: result.album.name,
        id: result.album.id,
        description: str,
        time: TimeHandle.getYMD(result.album.publishTime),
        singers,
        company: result.album.company,
        commentCount: computed(result.album.info.commentCount, "评论"),
        likedCount: computed(result.album.info.likedCount, "收藏"),
        shareCount: computed(result.album.info.shareCount, "分享")
      };
      context.commit("setalbumInfo", info);
      context.commit("setalbumSongs", result.songs);
      var arrSong = [];
      result.songs.forEach((song, index) => {
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
          index: index + 1,
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
      context.commit("setalbumSong", arrSong);
    }
  }
};
