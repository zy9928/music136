/**
 * @desc util 工具类
 * @author 郑缘
 * @param transforTime 将毫秒为单位的时间转化为分秒格式 
 * 传入参数：allTime 单位为毫秒的时间
 * 返回值为：str 分秒格式的字符串
 * @param computedOff 计算指定dom外边框到body边界的距离
 * 注：此方法的定位父级不能使用transform，否则数值会出错
 * 传入参数： dom 需要计算距离的元素
 * 返回值为：|—— left 距离body左侧距离
 *          |—— top 距离body顶部距离
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

export const computedOff = dom => {
  var l = 0;
  var t = 0;
  var bdl = dom.clientLeft; //元素左边框宽度
  var bdt = dom.clientTop; //元素上边框宽度
  while (dom) {
    l = l + dom.offsetLeft + dom.clientLeft;
    t = t + dom.offsetTop + dom.clientTop;
    dom = dom.offsetParent; //指向最近的定位父级
  }
  return { left: l - bdl, top: t - bdt };
};


export default {
  transforTime,
  computedOff
};
