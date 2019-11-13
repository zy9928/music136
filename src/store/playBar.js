export default {
  namespaced: true,
  state: {
    // 播放设置
    playerSetting: localStorage.getItem("player-setting")
      ? JSON.parse(localStorage.getItem("player-setting"))
      : {
          loopMode: 2,
          volumeValue: 1,
          index: 0
        },
    isPlayListShow: false,
    // 传入当前歌曲ID
    playNowId: "",
    // 歌曲列表
    playList: localStorage.getItem("playList")
      ? JSON.parse(localStorage.getItem("playList"))
      : []
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
    }
  },
  actions: {}
};
