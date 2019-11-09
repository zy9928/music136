const HOST = "http://localhost:3000";
// 获取歌词(需要音乐id)————参数：?id=音乐id
const SONG_WORD = HOST + "/lyric";
// 获取歌曲URL————参数：?id=音乐id[，音乐id2，音乐id3 ...]
const SONG_URL = HOST + "/song/url";
// 获取歌曲详情————参数：?ids=音乐id[, 音乐id2，音乐id3 ...]
const SONG_INFO = HOST + "/song/detail";

// 手机号注册
const register_phone = HOST;
//邮箱注册
const register_email = HOST;

//手机号登陆
const login_phone = HOST;
//邮箱登陆
const login_email = HOST;

//歌曲评论
const SONG_COMMENT = HOST + "/comment/music";


export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO,
  SONG_COMMENT
}

