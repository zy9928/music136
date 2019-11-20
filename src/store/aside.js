import http from "../utils/Http";
import api from "../utils/api";
import TimeHandle from './../utils/TimeHandle';

export default {
  namespaced: true,
  state: {
    songId: '',
    songListId: '544215255',
    singerId: '13283',
    albumSingerId: '',
    songLikers: [],
    similarSongList: [],
    similarSong: [],
    similarSinger: [],
    songListLikers: [],
    relateSongListRecommend: [],
    singerAlbum: [],
  },
  getters: {},
  mutations: {
    setSongId(state, num){
      state.songId = num;
    },
    setSongListId(state, num){
      state.songListId = num
    },
    setSingerId(state, num){
      state.singerId = num;
    },
    setAlbumSingerId(state, num){
      state.albumSingerId = num;
    },
    setSongLikers(state, arr) {
      state.songLikers = [...arr];
    },
    setSimilarSongList(state, arr) {
      state.similarSongList = [...arr];
    },
    setSimilarSong(state, arr) {
      state.similarSong = [...arr];
    },
    setSimilarSinger(state, arr) {
      state.similarSinger = [...arr];
    },
    setSongListLikers(state, arr) {
      state.songListLikers = [...arr];
    },
    setRelateSongListRecommend(state, arr) {
      state.relateSongListRecommend = [...arr];
    },
    setSingerAlbum(state, arr){
      state.singerAlbum = [...arr];
    }
  },
  actions: {
    // 获取最近5个听过该歌曲的用户
    async getSongLikers(context, params) {
      let {data: result} = await http.get(api.LISTENER_LAST5, params);
      var arr = [];
      result.userprofiles.forEach(item => {
        arr.push({
          userId: item.userId,
          userImg: item.avatarUrl
        });
      });
      context.commit("setSongLikers", arr);
    },
    // 获取包含该歌曲的歌单
    async getSimilarSongList(context, params) {
      let {data: result} = await http.get(api.SIMILAR_SONG_LIST, params);
      var arr = [];
      result.playlists.forEach(item => {
        arr.push({
          listId: item.id,
          listImg: item.coverImgUrl,
          listName: item.name,
          listUserId: item.creator.userId,
          listUserName: item.creator.nickname,
        });
      });
      context.commit("setSimilarSongList", arr);
    },
    // 获取相似歌曲
    async getSimilarSong(context, params) {
      let {data: result} = await http.get(api.SIMILAR_SONG, params);
      var arr = [];
      result.songs.forEach(item => {
        var singers = [];
        item.artists.forEach((singer, key) => {
          if(key == item.artists.length - 1){
            singers.push({
              singerId: singer.id,
              singerName: singer.name
            });
          }else if(key < item.artists.length - 1){
            singers.push({
              singerId: singer.id,
              singerName: singer.name + '/'
            });
          }
        });
        arr.push({
          songName: item.name,
          songId: item.id,
          singer: singers
        });
      });
      context.commit("setSimilarSong", arr);
    },
    // 获取相似歌手
    async getSimilarSinger(context, params) {
      let {data: result} = await http.get(api.SIMILAR_SINGER, params);
      var arr = [];
      result.artists.forEach(item => {
        arr.push({
          singerImg: item.picUrl,
          singerName: item.name,
          singerId: item.id
        });
      });
      context.commit("setSimilarSinger", arr);
    },
    // 歌单收藏者
    async getSongListLikers(context, params) {
      let {data: result} = await http.get(api.SONG_LIST_LIKERS, params);
      var arr = [];
      result.subscribers.forEach(item => {
        arr.push({
          userId: item.userId,
          userImg: item.avatarUrl
        });
      });
      context.commit("setSongListLikers", arr);
    },
    // 相关歌单推荐
    async getRelateSongListRecommend(context, params) {
      let {data: result} = await http.get(api.RELATE_SONG_LIST_RECOMMEND, params);
      var arr = [];
      result.playlists.forEach(item => {
        arr.push({
          listId: item.id,
          listImg: item.coverImgUrl,
          listName: item.name,
          listUserId: item.creator.userId,
          listUserName: item.creator.nickname,
        });
      });
      context.commit("setRelateSongListRecommend", arr);
    },
    // 获取ta的更多专辑
    async getSingerAlbum(context, params){
      let {data: result} = await http.get(api.SINGER_ALBUM, params);
      var arr = [];
      result.hotAlbums.forEach(item=>{
        var time = TimeHandle.getYMD(item.publishTime);
        arr.push({
          albumId: item.id,
          albumImg: item.blurPicUrl,
          albumName: item.name,
          albumTime: time
        })
      })
      context.commit("setSingerAlbum", arr);
    }
  }
};
