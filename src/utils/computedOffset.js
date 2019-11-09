/**
 * @desc computedOffset 工具类
 * @author 郑缘
 * @computedOff 计算指定dom外边框到body边界的距离
 * 注：此方法的定位父级不能使用transform，否则数值会出错
 * 传入参数： dom 需要计算距离的元素
 * 返回值为：|—— left 距离body左侧距离
 *          |—— top 距离body顶部距离
 */

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
  computedOff
};
