/**
 * @desc anotherUtil 工具类
 * @author 郑缘
 * @param parseLyric 将获取到的歌词文件转化为对象数组
 * 传入参数：text 歌词文件
 * 返回值为： lines 歌词对象数组
 * @param computedTime 将毫秒为单位的时间转化为分秒格式 
 * 传入参数：allTime 单位为毫秒的时间
 * 返回值为：str 分秒格式的字符串
 */

//歌词同步部分
export const parseLyric = text => {
  //将文本分隔成一行一行，存入数组
  var lines = [];
  var timeArr = null;
  var time = null;
  text.split("\n").forEach(item => {
    if (item) {
      timeArr = item.split(']')[0].split('[')[1].split(':')
      time = (timeArr[0] * 60 + timeArr[1]) * 1000;
      lines.push({
        [time]: item.split("]")[1]
      });
    }
  });

  return lines;
};

// 将单位为毫秒的时间转化为分秒格式
export const transforTime = allTime => {
  var minute = parseInt(allTime / 1000 / 60);
  var second = parseInt(allTime / 1000) % 60;
  if(minute < 10){
    minute = `0${minute}`;
  }
  if(second < 10){
    second = `0${second}`
  }
  var str = `${minute}:${second}`
  return str;
}

export default {
  parseLyric,
  transforTime
};
