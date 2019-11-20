export default {
  namespaced: true,
  state: {
    // 播放设置
    playerSetting: localStorage.getItem("player-setting")
      ? JSON.parse(localStorage.getItem("player-setting"))
      : {
          loopMode: 2,
          volumeValue: 1,
          index: null
        },
    isPlayListShow: false,
    // 传入当前歌曲ID
    playNowId: "",
    // 添加进播放列表
    addSongId: "",
    // 歌曲列表
    playList: localStorage.getItem("playList")
      ? JSON.parse(localStorage.getItem("playList"))
      : [],
    playNowTime: 0
  },
  getters: {},
  mutations: {
    setPlayerSetting(state, obj) {
      state.playerSetting = { ...obj };
      localStorage.setItem(
        "player-setting",
        JSON.stringify(state.playerSetting)
      );
    },
    setIsPlayListShow(state, bool) {
      state.isPlayListShow = bool;
    },
    setPlayNowId(state, num) {
      state.playNowId = num;
    },
    setPlayList(state, arr) {
      state.playList = [...arr];
      localStorage.setItem("playList", JSON.stringify(state.playList));
    },
    setPlayNowTime(state, num){
      state.playNowTime = num;
    },
    setAddSongId(state, num){
      console.log(num);
      state.addSongId = num;
    }
  },
  actions: {}
};
