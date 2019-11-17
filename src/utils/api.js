/**
 * @desc api 工具类
 * 实现地址的统一管理
 * @author 陈超, 郑缘，孙如意
 * @version 11.15.1
 * 陈超： 添加 TOP_ARTIST  EVENT 并输出
 * @version 11.12.1
 * 陈超： 添加PLAYLIST_DETAIL PLAYLIST 并输出
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
const PLAYLIST = HOST+"/user/playlist";
//获取歌单详情(歌单歌曲)
const PLAYLIST_DETAIL = HOST+"/playlist/detail";

//歌曲评论
const SONG_COMMENT = HOST + "/comment/music";
//专辑评论
const SONG_ALBUM = HOST + '/comment/album';
//歌单评论
const SONG_PLAYLIST = HOST + '/comment/playlist';
//MV评论
const SONG_MV = HOST + '/comment/mv';
//电台节目评论
const SONG_DJ = HOST + '/comment/dj';
//视频评论
const SONG_VIDEO = HOST + '/comment/video';
//热门评论
const SONG_HOT = HOST + '/comment/hot';
//给评论点赞  
const SONG_LIKE = HOST + '/comment/like';
//发送、删除评论
const SONG_SEND_DELETE = HOST + '/comment';

//歌手热门50首歌曲
const SONG_ARTIST_TOP = HOST + '/artist/top/song';
//歌手说有专辑
const SONG_ARTIST_ALBUM = HOST + '/artist/album';

//获取动态消息
const EVENT = HOST +"/event";
//获取热门歌手
const TOP_ARTIST = HOST+"/top/artists";

export default{
  SONG_WORD,
  SONG_URL,
  SONG_INFO,
  REGISTER_PHONE,
  LOGIN_PHONE,
  LOGIN_EMAIL,
  SEND_CODE,
  VERIFY_CODE,
  PLAYLIST,
  PLAYLIST_DETAIL,
  SONG_COMMENT,
  SONG_LIKE,
  SONG_SEND_DELETE,
  SONG_ALBUM,
  SONG_PLAYLIST,
  SONG_MV,
  SONG_DJ,
  SONG_VIDEO,
  SONG_HOT,
  EVENT,
  TOP_ARTIST,
  SONG_ARTIST_TOP,
  SONG_ARTIST_ALBUM
}

