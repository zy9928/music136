/**
 * @desc playServe 服务类,
 * 播放组件和播放页面的ajax数据请求
 * @author 郑缘
 * @param getSongUrl
 * 请求音频地址的方法
 * 传入参数： value 为歌曲id
 * 返回值为：|—— type 音频类型;
 *          |—— url 音频地址
 * @param getSongInfo
 * 请求歌曲信息的方法
 * 传入参数： value 为歌曲id
 * 返回值为：|—— songName 歌曲名字;
 *          |—— singerName 歌手名字;
 *          |—— singerId 歌手id
 *          |—— albumName 专辑名称;
 *          |—— albumImg 专辑封面
 *          |—— albumId 专辑ID
 *          |—— duration 歌曲时长
 * @param getSongWord
 * 请求歌曲歌词的方法
 * 传入参数为： value 为歌曲id
 * 返回值为：
 */

import api from "./../utils/api";
import Http from "./../utils/Http";

// 请求音频地址
export const getSongUrl = async value => {
  // 发送请求
  if(!value){
    return {
      type: '',
      url: '',
    }
  }
  const { data: result } = await Http.get(api.SONG_URL, { id: value });
  // 判断请求的结果
  if (result.code === 200) {
    // 处理数据
    const { type, url } = result.data[0];
    return {
      // 音频类型
      type,
      // 音频地址
      url
    };
  } else {
    // 失败了
    throw new Error(result.message);
  }
};

// 请求歌曲数据
export const getSongInfo = async (value) => {
  // 发送请求
  if(!value){
    return {
      // 歌曲信息的全部数据
      songInfoAll: {},
      // 歌曲名字
      songName: '',
      // 歌手
      singer: [],
      // 专辑名称
      albumName: '',
      // 专辑封面
      albumImg: '',
      // 专辑ID
      albumId: '',
      // 歌曲时长
      duration: ''
    }
  }
  const { data: result } = await Http.get(api.SONG_INFO, { ids: value });
  // 判断请求的结果
  if (result.code === 200) {
    // 处理数据
    const songInfoAll = result.songs[0];
    const { name: songName, ar, al: album, dt: duration } = result.songs[0];
    // const {name: singerName, id:singerId} = singer[0];
    var singer = [];
    ar.forEach((item, index) => {
      if (index == ar.length - 1) {
        singer.push({
          singerName: item.name,
          singerId: item.id
        });
      } else {
        singer.push({
          singerName: item.name + "/",
          singerId: item.id
        });
      }
    });
    const { name: albumName, picUrl: albumImg, id: albumId } = album;
    return {
      // 歌曲信息的全部数据
      songInfoAll,
      // 歌曲名字
      songName,
      // 歌手
      singer,
      // 专辑名称
      albumName,
      // 专辑封面
      albumImg,
      // 专辑ID
      albumId,
      // 歌曲时长
      duration
    };
  } else {
    // 失败了
    throw new Error(result.message);
  }
};

// 请求歌词
export const getSongWord = async (value) => {
  if(!value){
    return '';
  }
  const { data: result } = await Http.get(api.SONG_WORD, { id: value });
  // 判断请求结果
  if (result.code === 200){
    return result;
  }
}
