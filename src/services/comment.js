import Http from '../utils/Http'

//请求歌曲、mv、视频等评论  参数分别为：种类，资源id，offset偏移量，上一页的最后一个评论的time（超过5000条时使用）
export const getSongComments = async (kinds, id, num, time) => {
  //发送请求
  let result = null;
  if(time){
    const {data} = await Http.get(kinds, {id: id, offset: num, before: time});
    result = data;
  }else{
    const {data} = await Http.get(kinds, {id: id, offset: num});
    result = data;
  }
 
  if(result.code == 200){
    //请求成功
    //获得数据
    const {comments, hotComments, total} = result;
    // console.log(hotComments);
    //处理最近评论
    const timeCom = comments.map(item=>{
      // console.log(item.time);
      return {
        commentId: item.commentId,
        content: item.content,
        nickname: item.user.nickname,
        userId: item.user.userId,
        userPic: item.user.avatarUrl,
        likedCount: item.likedCount,
        time: item.time,
        liked: item.liked
      }
    });
    // console.log(timeCom);
    //处理精彩评论
    const hotCom = hotComments && hotComments.map(item=>{
      return {
        commentId: item.commentId,
        content: item.content,
        nickname: item.user.nickname,
        userId: item.user.userId,
        userPic: item.user.avatarUrl,
        likedCount: item.likedCount,
        time: item.time,
        liked: item.liked
      }
    })
    //处理总的评论数据
    const totalCom = total.toString();

    // console.log(comments);
    // console.log(hotComments);
    // console.log(total);
    return {
      timeCom,
      hotCom,
      totalCom
    }
  }else {
    //请求失败
    throw new Error(result.message);
  }
}


//给评论点赞  参数分别为：资源id,评论cid，t是否点赞（1：点赞  0：取消点赞），type资源类型（数字0~6）
//点赞的API疑似有问题
export const getSongLike = async (kinds, id, cid, t, type) => {
  console.log(kinds, id,cid,t,type);
  
  const {data: result} = await Http.get(kinds, {id: id, cid: cid, t: t, type: type});
  console.log(result);
  if(result.code==200){
   
  }
  
}

//发送评论或删除评论  t(1:发送 2：回复 0：删除) type类型 id对应资源id  content发送的内容 commentId回复的评论id
export const getSendDelete = async (kinds, t, type, id, content, commentId) => {
  console.log(kinds, t, type, id, content, commentId);
  if(commentId){
    const {data: result} = await Http.get(kinds, {t: t, type: type, id: id, content: content, commentId: commentId});
  }else{
    const {data: result} = await Http.get(kinds, {t: t, type: type, id: id, content: content});
  }
  console.log(result);
  
  
}
export default{
  getSongComments,
  getSongLike,
  getSendDelete
}