/**
 * @desc api 工具类
 * 实现地址的统一管理
 * @author 陈超, 郑缘，孙如意
 * @version 11.9.2
 * 孙如意： 添加SONG_COMMENT并输出
 * @version 11.9.1
 * 陈超：将HOST输出
 *      将REGISTER_PHONE  REGISTER_EMAIL  LOGIN_PHONE  LOGIN_EMAIL 改为大写
 * @version 11.7.1
 * 郑缘 新增了常量 HOST SONG_WORD SONG_URL SONG_INFO, 并在export default中输出
 * 陈超 新增了常量 register_phone register_email login_phone login_email
 */

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

//歌曲评论
const SONG_COMMENT = HOST + "/comment/music";


export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO,
  REGISTER_PHONE,
  REGISTER_EMAIL,
  LOGIN_PHONE,
  LOGIN_EMAIL,
  SONG_COMMENT
}

