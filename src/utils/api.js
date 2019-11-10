export const HOST = "http://localhost:3000";
// 获取歌词(需要音乐id)————参数：?id=音乐id
const SONG_WORD = HOST + "/lyric";
// 获取歌曲URL————参数：?id=音乐id[，音乐id2，音乐id3 ...]
const SONG_URL = HOST + "/song/url";
// 获取歌曲详情————参数：?ids=音乐id[, 音乐id2，音乐id3 ...]
const SONG_INFO = HOST + "/song/detail";



//发送验证码
const SEND_CODE = HOST+"/captcha/sent";
//验证验证码
const VERIFY_CODE =HOST+"/captcha/verify";
// 手机号注册
const REGISTER_PHONE =HOST+"/register/cellphone";

//手机号登陆
const LOGIN_PHONE = HOST+"/login/cellphone";
//邮箱登陆
const LOGIN_EMAIL = HOST+"/login";

//获取用户歌单
const PLAYLIST = HOST+"/login"


export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO,
  REGISTER_PHONE,
  LOGIN_PHONE,
  LOGIN_EMAIL,
  SEND_CODE,
  VERIFY_CODE,
}

