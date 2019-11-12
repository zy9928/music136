/**
 * @desc:时间处理工具类
 * @author:陈超
 * @date : 2019-11-12
 */
export default class TimeHandle {
  /**
   * 通过毫秒数获取歌曲的分秒
   * @param {*毫秒数} milliSeconds
   */
  static getMS(milliSeconds) {
    let date = new Date(milliSeconds);
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return this.getDoubleNum(minutes) + ":" + this.getDoubleNum(seconds);
  }

  /**
   * 通过毫秒数获取年月日
   * @param {*毫秒数} milliSeconds
   */
  static getYMD(milliSeconds) {
    let date = new Date(milliSeconds);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    return year+'-'+this.getDoubleNum(month)+'-'+this.getDoubleNum(day);
  }

  /**
   * 获取带有0的两位的数字
   * @param {*数字} num
   */
  static getDoubleNum(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num.toString();
  }
}
