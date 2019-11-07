const HOST = "http://localhost:3000";
// 获取歌词(需要音乐id)————参数：?id=音乐id
const SONG_WORD = HOST + "/lyric";
// 获取歌曲URL————参数：?id=音乐id[，音乐id2，音乐id3 ...]
const SONG_URL = HOST + "/song/url";
// 获取歌曲详情————参数：?ids=音乐id[, 音乐id2，音乐id3 ...]
const SONG_INFO = HOST + "/song/detail";



export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO
}