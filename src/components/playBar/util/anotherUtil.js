/**
 * @desc anotherUtil 工具类
 * @author 郑缘
 * @param parseLyric 将获取到的歌词文件转化为对象数组
 * 传入参数：text 歌词文件
 * 返回值为： lines 歌词对象数组
 * @param handleLoopMode 处理循环模式
 *
 */

//歌词同步部分
export const parseLyric = text => {
  // console.log(text);
  if(text == ''){
    return [];
  }
  //将文本分隔成一行一行，存入数组
  var lines = [];
  var timeArr = null;
  var time = null;
  text.split("\n").forEach(item => {
    if (item) {
      timeArr = item
        .split("]")[0]
        .split("[")[1]
        .split(":");
        // console.log(timeArr, timeArr[0]*60, timeArr[1]);
      time = (Number(timeArr[0]) * 60 + Number(timeArr[1])) * 1000;
      if (time) {
        lines.push({
          time: time,
          word: item.split("]")[1]
        });
      }
    }
  });
  // console.log(lines)
  return lines;
};

/* // 处理循环模式
export const handleLoopMode = (playSetting, audio, playList) => {
  console.log(playSetting.loopMode);
  if(playSetting.loopMode == 2){
    audio.loop = true;
  }else{
    audio.loop = false;
    if(playSetting.loopMode == 0){
      if(ended){
        if(playSetting.index >= playList.length - 1){
          playSetting.index = 0;
        }
      }
    }
  }
} */

export default {
  parseLyric
  // handleLoopMode,
};
