export default {
  namespaced: true,
  state: {
    playerSetting: localStorage.getItem("player-setting")
      ? JSON.parse(localStorage.getItem("player-setting"))
      : {
        loopMode: 2,
        volumeValue: 1,
        index: 0,
      }
  },
  getters: {},
  mutations: {
    setPlayerSetting(state, obj) {
      state.playerSetting = {...obj};
      localStorage.setItem("player-setting", JSON.stringify(state.playerSetting));
    }
  },
  actions: {}
};
