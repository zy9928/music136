/**
 * @desc: localStorage 工具类,
 * 结合vuex实现存储用户信息
 * @author:陈超
 */

const localEvent = function(item) {
  this.get = function() {
    return localStorage.getItem(item)
      ? JSON.parse(localStorage.getItem(item))
      : "";
  };

  this.set = function(obj) {
    localStorage.setItem(item, JSON.stringify(obj));
  };

  this.clear = function() {
    localStorage.removeItem(item);
  };
};
export const user_info = new localEvent("data");

export const getDate = () => {
  //获取当天时间
  const date = new Date();
  const month = parseInt(date.getMonth) + 1;
  return date.getTime();
};
