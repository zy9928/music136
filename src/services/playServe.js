import api from './../utils/api';
import Http from "./../utils/Http";

// 请求歌曲路径
export const getSongUrl = async () => {
  // 发送请求
  const {data: result} = await Http.get(api.SONG_URL, {id: 308235});
  // 判断请求的结果
  if(result.code === 200){
    // 处理数据
    const {type, url} = result.data[0];
    return {
      type,
      url
    }
  }else{
    // 失败了
    throw new Error(result.message);
  }
}

// 请求歌曲数据
export const getSongInfo = async () => {
  // 发送请求
  const {data: result} = await Http.get(api.SONG_INFO, {ids: 308235});
  console.log(result.songs);
  // 判断请求的结果
  if(result.code === 200){
    // 处理数据
    const {name: songName, ar: singer, al: album} = result.songs[0];
    const {name: singerName} = singer[0];
    const {name: albumName, picUrl: albumImg} = album;
    return {
      songName,
      singerName,
      albumName,
      albumImg
    }
  }else{
    // 失败了
    throw new Error(result.message);
  }
}