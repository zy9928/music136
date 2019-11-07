export const HOST = "http://localhost:3000";
// 获取歌词(需要音乐id)————参数：?id=音乐id
const SONG_WORD = HOST + "/lyric";
// 获取歌曲URL————参数：?id=音乐id[，音乐id2，音乐id3 ...]
const SONG_URL = HOST + "/song/url";
// 获取歌曲详情————参数：?ids=音乐id[, 音乐id2，音乐id3 ...]
const SONG_INFO = HOST + "/song/detail";

// 手机号注册
const REGISTER_PHONE = HOST;
//邮箱注册
const REGISTER_EMAIL = HOST;

//手机号登陆
const LOGIN_PHONE = HOST+"/login/cellphone";
//邮箱登陆
const LOGIN_EMAIL = HOST+"/login";


export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO,
  REGISTER_PHONE,
  REGISTER_EMAIL,
  LOGIN_PHONE,
  LOGIN_EMAIL
}

