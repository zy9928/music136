/**
 * @desc 控制声音 工具类
 * @author 郑缘
 * @param volumeMove 拖拽/点击音量条
 * 传入参数：|—— e 事件对象
 *          |—— audio 音频标签实例
 *          |—— volumeVule 声音条
 *          |—— volumeCtrlWarp 声音控制盒子
 *          |—— _this vue实例
 * @param volumeShow 根据当前音量显示音量条
 * 传入参数：|—— audio 音频标签实例
 *          |—— volumeVule 声音条
 */

import { computedOff } from "./../../../utils/util";

// 处理是否静音
function handleIsNoVolume(audio, _this){
  if (audio.volume == 0) {
    _this.isNoVolume = true;
  } else {
    _this.isNoVolume = false;
  }
}

// 拖拽
export const volumeMove = (e, audio, volumeVule, volumeCtrlWarp, _this) => {
  var volumeTop = e.clientY - computedOff(volumeCtrlWarp).top;
  if (volumeTop < 0 || volumeTop > 92) {
    return;
  }
  audio.volume = 1 - volumeTop / 92;
  volumeVule.style.top = volumeTop + "px";
  handleIsNoVolume(audio, _this);
  // 移动
  document.onmousemove = function(e2) {
    var volumeTop2 = e2.clientY - computedOff(volumeCtrlWarp).top;
    if (volumeTop2 < 0) {
      volumeTop2 = 0;
    } else if (volumeTop2 > 92) {
      volumeTop2 = 92;
    }
    audio.volume = 1 - volumeTop2 / 92;
    volumeVule.style.top = volumeTop2 + "px";
    handleIsNoVolume(audio, _this);
  };
  // 鼠标松开
  document.onmouseup = function() {
    document.onmousemove = null;
    _this.playerSetting.volumeValue = audio.volume;
    _this.$store.commit("playBar/setPlayerSetting", _this.playerSetting);
    document.onmouseup = null;
  };
};

// 处理初始状态
export const volumeShow = (audio, volumeVule, _this) => {
  audio.volume = _this.playerSetting.volumeValue;
  handleIsNoVolume(audio, _this);
  volumeVule.style.top = `${92 * (1 - audio.volume)}px`;
};

export default {
  volumeMove,
  volumeShow
};
