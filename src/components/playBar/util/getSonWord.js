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

export default {
  parseLyric
};
