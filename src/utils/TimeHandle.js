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
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return year + "-" + this.getDoubleNum(month) + "-" + this.getDoubleNum(day);
  }

  /**
   * 通过毫秒数获取时分
   * @param {毫秒数} milliSeconds 
   */
  static getHS(milliSeconds){
    let date  = new Date(milliSeconds);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return this.getDoubleNum(hours) + ":" + this.getDoubleNum(minutes);
  }

  /**
   * 获取月份加时间
   * @param {*毫秒数} milliSeconds
   */
  static getMDT(milliSeconds) {
    let date = new Date(milliSeconds);
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return (
      this.getDoubleNum(month) +
      "-" +
      this.getDoubleNum(day) +
      " " +
      this.getHS(milliSeconds)
    );
  }
  /**
   * 获取完整日期
   * @param {毫秒数} milliSeconds
   */
  static getFUllDate(milliSeconds) {
    return this.getYMD + " " + this.getMS();
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

  /**
   * 获取过去时间是当前时间的哪一天
   * 返回字符串()
   * @param {*毫秒数} time
   */
  static getDiffTime(time) {
    let now = new Date();
    let nowTime = now.getTime();
    let last = new Date(time);
    //过去时间和当前时间相差秒数
    let diffSecond = parseInt((nowTime - time) / 1000);

    if (diffSecond > 0 && diffSecond < 60) {
      //小于1分钟返回刚刚
      return "刚刚";
    } else if (diffSecond >= 60 && diffSecond < 60 * 60) {
      //大于1分钟，小于1小时,显示分钟
      return `${parseInt(diffSecond/(60))} 分钟前`;
    } else if (diffSecond >= 60 * 60 && diffSecond < 60 * 60 * 24) {
      //大于等于1小时,小于24小时,显示具体时间
      return this.getHS(time);
    } else if (diffSecond >= 60 * 60 * 24 && diffSecond < 60 * 60 * 24 * 3) {
      //大于等于1天，显示昨天加上具体时间
      return "昨天"+ " " + this.getHS(time);
    } else if (last.getFullYear == now.getFullYear) {
      //两者同一年，显示月份加时间
      return this.getMDT(time);
    } else {
      //其他条件显示完整时间
      return this.getFUllDate(time);
    }
  }
}
