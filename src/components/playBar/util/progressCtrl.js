/**
 * @desc 控制播放进度条 工具类
 * @author 郑缘
 * @param progressCtrl 播放时，进度条实时变化
 * 传入参数：|—— audio 音频标签实例
 *          |—— ctrlBtn 进度条控制按钮
 *          |—— porgress 进度条
 *          |—— _this vue实例
 * @param progressClc 点击、拖拽进度条/控制钮 ,时间的变化
 * 传入参数：|—— e 事件对象 event
 *          |—— audio 音频标签实例
 *          |—— ctrlBtn 进度条控制按钮
 *          |—— porgress 进度条
 *          |—— _this vue实例
 */
import { transforTime, computedOff } from "./../../../utils/util";

const randomValue = (oldVal, maxVal, cb) => {
  var value = Math.floor(Math.random() * maxVal);
  if (value == oldVal) {
    cb();
  } else {
    return value;
  }
};

export const progressCtrl = (audio, ctrlBtn, porgress, _this) => {
  // 播放时，进度条实时变化
  audio.ontimeupdate = function() {
    // 记录播放时间
    _this.$store.commit("playBar/setPlayNowTime", audio.currentTime);
    // 时间显示实时变化
    _this.timeNow = transforTime(audio.currentTime * 1000);
    var percent = audio.currentTime / audio.duration;
    // 进度条实时变化
    ctrlBtn.style.transform = `translateX(${486 * percent}px)`;
    porgress.style.backgroundImage = `linear-gradient(to right, #C70C0C 0%, #C70C0C ${percent *
      100}%, #191919 ${percent * 100}%, #191919 100%)`;
    // 判断循环方式
    if (_this.playerSetting.loopMode == 2) {
      audio.loop = true;
    } else {
      audio.loop = false;
      var obj = { ..._this.playerSetting };
      if (_this.playerSetting.loopMode == 0) {
        if (audio.ended) {
          if (_this.playerSetting.index >= _this.playList.length - 1) {
            obj.index = 0;
          } else {
            obj.index++;
          }
          _this.$store.commit("playBar/setPlayerSetting", obj);
        }
      } else if (_this.playerSetting.loopMode == 1) {
        // var value = Math.floor(Math.random()*_this.playList.length);
        if (audio.ended) {
          obj.index = randomValue(
            _this.playerSetting.index,
            _this.playList.length,
            randomValue
          );
          _this.$store.commit("playBar/setPlayerSetting", obj);
        }
      }
    }
  };
};
// 点击进度条实时变化播放时间
export const progressClc = (e, ctrlBtn, porgress, audio, _this) => {
  var percent = (e.clientX - computedOff(porgress).left) / 486;
  // 设置按钮
  ctrlBtn.style.transform = `translateX(${486 * percent}px)`;
  // 设置进度
  porgress.style.backgroundImage = `linear-gradient(to right, #C70C0C 0%, #C70C0C ${percent *
    100}%, #191919 ${percent * 100}%, #191919 100%)`;
  // 设置播放
  audio.currentTime = audio.duration * percent;
  // 拖拽事件
  document.onmousemove = e2 => {
    audio.pause();
    _this.isPlay = false;
    if (e2.clientX > computedOff(porgress).left + 486) {
      var e2X = computedOff(porgress).left + 486;
    } else if (e2.clientX < computedOff(porgress).left) {
      var e2X = computedOff(porgress).left;
    } else {
      var e2X = e2.clientX;
    }
    ctrlBtn.style.transform = `translateX(${486 * percent +
      e2X -
      e.clientX}px)`;
    var percent2 = (e2X - computedOff(porgress).left) / 486;
    porgress.style.backgroundImage = `linear-gradient(to right, #C70C0C 0%, #C70C0C ${percent2 *
      100}%, #191919 ${percent2 * 100}%, #191919 100%)`;
    audio.currentTime = audio.duration * percent2;
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    audio.play();
    _this.isPlay = true;
    document.onmouseup = null;
  };
};

export default {
  progressCtrl,
  progressClc
};
