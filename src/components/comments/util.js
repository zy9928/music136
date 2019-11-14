export const getTime = function(item) {
  // console.log(item);
  
  var d = new Date();
  //分钟
  let time = parseInt((d.getTime() - item.time) / 1000 / 60);
  // console.log(time);
  // console.log(time/60);

  if (time < 1) {
    //在一分钟以内显示 刚刚
    return "刚刚";
  } else if (time > 1 && time < 60) {
    //在一小时内显示 **分钟前
    return `${time}分钟前`;
  } else if (time > 60 && time < 60 * 24) {
    //在一小时外，并且在一天内显示 **：**
    let hours = Math.abs(d.getHours() - parseInt(time / 60));
    let minutes = Math.abs(d.getMinutes() - parseInt(time % 60));
    // console.log(hours);
    // console.log(minutes);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes}`;
  } else if (time > 60 * 24 && time < 60 * 24 * 2) {
    //在一天外，两天内显示 昨天**：**
    let hours = Math.abs(d.getHours() - parseInt(time / 60));
    let minutes = Math.abs(d.getMinutes() - parseInt(time % 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `昨天 ${hours}:${minutes}`;
  } else if (time > 60 * 24 * 2 && time < 60 * 24 * 365) {
    //在一年内显示 **月**日 **：**
    let months = parseInt(time / 60 / 24 / 30) + d.getMonth() + 1;
    let day = d.getDate() - parseInt(time / 60 / 24);
    let hours = Math.abs(d.getHours() - parseInt(time / 24 / 60));
    let minutes = Math.abs(d.getMinutes() - parseInt((time / 24) % 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${months}月${day}日 ${hours}:${minutes}`;
  } else {
    //一年外显示 ****年**月**日 **：**
    let years =
      parseInt(d.getFullYear()) - parseInt(time / 60 / 24 / 30 / 365);
    let months = parseInt((time / 60 / 24) % 30) - d.getMonth() - 1;
    let day = d.getDate() - parseInt(time / 60 / 24);
    let hours = Math.abs(d.getHours() - parseInt(time / 24 / 60));
    let minutes = Math.abs(d.getMinutes() - parseInt((time / 24) % 60));
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${years}年${months}月${day}日 ${hours}:${minutes}`;
  }
}

export default {
  getTime
}