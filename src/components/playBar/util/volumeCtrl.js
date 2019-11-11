/**
 * @desc 控制声音 工具类
 * @author 郑缘
 * @param volumeMove 拖拽/点击音量条
 * 传入参数：|—— e 事件对象
 *          |—— audio 音频标签实例
 *          |—— volumeVule 声音条
 *          |—— volumeNow 声音控制点
 * @param volumeShow 根据当前音量显示音量条
 * 传入参数：|—— audio 音频标签实例
 *          |—— volumeVule 声音条
 *          |—— volumeNow 声音控制点
 */

import { computedOff } from "./../../../utils/util";

export const volumeMove = (e, audio, volumeVule, volumeNow) => {
  console.log(computedOff(volumeVule), computedOff(volumeNow))
}

export const volumeShow = (audio, volumeVule, volumeNow) => {
  volumeVule.style.top = `${10 + 93 * (1 - audio.volume)}px`;
  volumeNow.style.top = `${10 + 93 * (1 - audio.volume) - 6}px`;
}

export default {
  volumeMove,
  volumeShow
}