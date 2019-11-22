/**
 * @desc api 工具类
 * 实现地址的统一管理
 * @author 陈超, 郑缘，孙如意
 * @version 11.17.1
 * 孙如意： 添加了SONG_ARTIST_ALBUM  SONG_ARTIST_TOP  SONG_SEND_DELETE  SONG_LIKE  SONG_HOT  SONG_VIDEO  SONG_DJ  SONG_MV  SONG_PLAYLIST  SONG_ALBUM  并输出
 * 郑缘： 添加了SINGER_ALBUM  RELATE_SONG_LIST_RECOMMEND  SONG_LIST_LIKERS  SIMILAR_SINGER  SIMILAR_SONG  SIMILAR_SONG_LIST  LISTENER_LAST5 并输出
 * 陈超： 添加了RESOURCE_LIKE 并输出
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

// export const HOST = "http://localhost:3000";
export const HOST = "";

// 获取歌词(需要音乐id)————参数：?id=音乐id
const SONG_WORD = HOST + "/lyric";
// 获取歌曲URL————参数：?id=音乐id[，音乐id2，音乐id3 ...]
const SONG_URL = HOST + "/song/url";
// 获取歌曲详情————参数：?ids=音乐id[, 音乐id2，音乐id3 ...]
const SONG_INFO = HOST + "/song/detail";

// 获取最近5个听了这首歌的用户————参数：?id=歌曲id
const LISTENER_LAST5 = HOST + "/simi/user";
// 获取相似歌单————参数：?id=歌曲id
const SIMILAR_SONG_LIST = HOST + "/simi/playlist";
// 获取相似音乐————参数： ?id=歌曲id
const SIMILAR_SONG = HOST + "/simi/song";
// 获取相似歌手————参数：?id=歌手id
const SIMILAR_SINGER = HOST + "/simi/artist";
// 歌单收藏者————参数：?id=歌单id[&limit=取出评论数，默认20 &offset=偏移数量，用于分页]
const SONG_LIST_LIKERS = HOST + "/playlist/subscribers";
// 相关歌单推荐————参数：?id=歌单id
const RELATE_SONG_LIST_RECOMMEND = HOST + "/related/playlist";
// 获取歌手专辑————参数：?id=歌手id[&limit=取出数量，默认50 &offset=偏移数量，默认为0]
const SINGER_ALBUM = HOST + "/artist/album";

// 获取歌单详情————参数：?id=歌单id[&s=歌单最近s个收藏者];
const SONG_LIST_INFO = HOST + "/playlist/detail";

// 获取专辑详情————参数：?id=专辑id
const ALBUM_INFO = HOST + "/album";

// 获取搜索推荐————参数：?keywords= 关键词[& type=若传入mobile则返回移动端数据]
const SEARCH_SUGGEST = HOST + "/search/suggest"

//获取首页banner图
const HOME_BANNER = HOST + "/banner";

//发送验证码
const SEND_CODE = HOST + "/captcha/sent";
//验证验证码
const VERIFY_CODE = HOST + "/captcha/verify";
// 手机号注册
const REGISTER_PHONE = HOST + "/register/cellphone";

//手机号登陆
const LOGIN_PHONE = HOST + "/login/cellphone";
//邮箱登陆
const LOGIN_EMAIL = HOST + "/login";

//获取用户歌单
const PLAYLIST = HOST + "/user/playlist";
//获取歌单详情(歌单歌曲)
const PLAYLIST_DETAIL = HOST + "/playlist/detail";

//歌曲评论
const SONG_COMMENT = HOST + "/comment/music";
//专辑评论
const SONG_ALBUM = HOST + "/comment/album";
//歌单评论
const SONG_PLAYLIST = HOST + "/comment/playlist";
//MV评论
const SONG_MV = HOST + "/comment/mv";
//电台节目评论
const SONG_DJ = HOST + "/comment/dj";
//视频评论
const SONG_VIDEO = HOST + "/comment/video";
//热门评论
const SONG_HOT = HOST + "/comment/hot";
//给评论点赞
const SONG_LIKE = HOST + "/comment/like";
//发送、删除评论
const SONG_SEND_DELETE = HOST + "/comment";

//歌手热门50首歌曲
const SONG_ARTIST_TOP = HOST + "/artist/top/song";
//歌手所有专辑
const SONG_ARTIST_ALBUM = HOST + "/artist/album";
//歌手描述
const SONG_ARTIST_DESC = HOST + "/artist/desc";
//首页入驻歌手
const ARTIST_LIST = HOST + '/artist/list';
//首页热门主播
const TOP_POPULAR = HOST + '/dj/toplist/popular';



//获取动态消息
const EVENT = HOST + "/event";
//获取热门歌手
const TOP_ARTIST = HOST + "/top/artists";
//资源点赞(此处目前用于动态点赞)
const RESOURCE_LIKE = HOST + "/resource/like";
//获取动态评论(参数treadId:线程id)
const COMMENT_EVENT = HOST + "/comment/event";
//发布动态
const SHARE_RESOURCE = HOST + "/share/resource";

//获取首页每日歌单推荐
const RECOMMEND_RESOURCE = HOST + '/recommend/resource';
//获取首页新碟上架
const ALBUM_NEWEST = HOST + '/album/newest';
//获取首页榜单
const TOP_LIST = HOST + '/top/list';

//搜索
// 必选参数 : keywords : 关键词
// 可选参数 : limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
const SEARCH = HOST + "/search";

//视频(需要参数id:视频id)
const VIDEO = HOST + "/video/url";

//退出
const LOGOUT = HOST+"/logout";

export default {
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
  LISTENER_LAST5,
  SIMILAR_SONG_LIST,
  SIMILAR_SONG,
  SIMILAR_SINGER,
  SONG_LIST_LIKERS,
  RELATE_SONG_LIST_RECOMMEND,
  SINGER_ALBUM,
  SONG_ARTIST_TOP,
  SONG_ARTIST_ALBUM,
  RESOURCE_LIKE,
  SONG_ARTIST_DESC,
  HOME_BANNER,
  COMMENT_EVENT,
  SONG_LIST_INFO,
  RECOMMEND_RESOURCE,
  SEARCH,
  ALBUM_INFO,
  ALBUM_NEWEST,
  TOP_LIST,
  SHARE_RESOURCE,
  VIDEO,
  SEARCH_SUGGEST,
  ARTIST_LIST,
  TOP_POPULAR,
  LOGOUT
};
