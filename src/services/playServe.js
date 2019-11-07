/**
 * @desc playServe 服务类,
 * 播放组件和播放页面的ajax数据请求
 * @author 郑缘
 * @param getSongUrl
 * 请求音频地址的方法
 * 传入参数： id 为歌曲id
 * 返回值为：|—— type 音频类型;
 *          |—— url 音频地址
 * @param getSongInfo
 * 请求歌曲信息的方法
 * 传入参数： ids 为歌曲id
 * 返回值为：|—— songName 歌曲名字;
 *          |—— singerName 歌手名字;
 *          |—— albumName 专辑名称;
 *          |—— albumImg 专辑封面
 * @version 11.7.1
 * 郑缘 添加了输出方法 getSongUrl getSongInfo
 */

import api from './../utils/api';
import Http from "./../utils/Http";

// 请求音频地址
export const getSongUrl = async (id) => {
  // 发送请求
  const {data: result} = await Http.get(api.SONG_URL, {id: 255660});
  // 判断请求的结果
  if(result.code === 200){
    // 处理数据
    const {type, url} = result.data[0];
    return {
      // 音频类型
      type,
      // 音频地址
      url
    }
  }else{
    // 失败了
    throw new Error(result.message);
  }
}

// 请求歌曲数据
export const getSongInfo = async (ids) => {
  // 发送请求
  const {data: result} = await Http.get(api.SONG_INFO, {ids: 255660});
  console.log(result.songs);
  // 判断请求的结果
  if(result.code === 200){
    // 处理数据
    const {name: songName, ar: singer, al: album} = result.songs[0];
    const {name: singerName} = singer[0];
    const {name: albumName, picUrl: albumImg} = album;
    return {
      // 歌曲名字
      songName,
      // 歌手名字
      singerName,
      // 专辑名称
      albumName,
      // 专辑封面
      albumImg
    }
  }else{
    // 失败了
    throw new Error(result.message);
  }
}