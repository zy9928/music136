
import Http from '../utils/Http'

//请求歌曲评论
export const getSongComments = async (kinds, id, num, time) => {
  //发送请求
  const {data: result} = await Http.get(kinds, {id: id, offset: num, before: time});
  // console.log(result);
  
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
        time: item.time
      }
    });
    //处理精彩评论
    const hotCom = hotComments && hotComments.map(item=>{
      return {
        commentId: item.commentId,
        content: item.content,
        nickname: item.user.nickname,
        userId: item.user.userId,
        userPic: item.user.avatarUrl,
        likedCount: item.likedCount,
        time: item.time
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
export default{
  getSongComments
}