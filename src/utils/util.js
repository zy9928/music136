/**
 * @desc util 工具类
 * @author 郑缘
 * @param transforTime 将毫秒为单位的时间转化为分秒格式 
 * 传入参数：allTime 单位为毫秒的时间
 * 返回值为：str 分秒格式的字符串
 */

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
  transforTime
};
