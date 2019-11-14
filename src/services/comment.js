import api from '../utils/api'
import Http from '../utils/Http'
import { parse } from 'url';

//请求歌曲评论
export const getSongComments = async () => {
  //发送请求
  const {data: result} = await Http.get(api.SONG_COMMENT, {id: 186016});
  // console.log(result);
  
  if(result.code == 200){
    //请求成功
    //获得数据
    const {comments, hotComments, total} = result;
    //处理最近评论
    const timeCom = comments.map(item=>{
      return {
        commentId: item.commentId,
        content: item.content,
        nickname: item.user.nickname,
        userId: item.user.userId,
        userPic: item.user.avatarUrl,
        likedCount: item.likedCount,
        time: getTime(item)
      }
    });
    //处理精彩评论
    const hotCom = hotComments.map(item=>{
      return {
        commentId: item.commentId,
        content: item.content,
        nickname: item.user.nickname,
        userId: item.user.userId,
        userPic: item.user.avatarUrl,
        likedCount: item.likedCount,
        time: getTime(item)
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
    
    function getTime(item){
      var d = new Date();
      //分钟
      let time = parseInt((d.getTime() - item.time)/1000/60);
      console.log(time);
      console.log(time/60);
      
      
      if(time < 1){
        //在一分钟以内显示 刚刚
        return '刚刚';

      }else if((time > 1) && (time < 60)){
        //在一小时内显示 **分钟前
        return (`${time}分钟前`);

      }else if((time > 60) && (time < 60*24)){
        //在一小时外，并且在一天内显示 **：**
        let hours = Math.abs(d.getHours() - parseInt(time/60));
        let minutes = Math.abs(d.getMinutes() - parseInt(time%60));
        // console.log(hours);
        // console.log(minutes);
        hours = hours < 10 ? '0' + hours : hours; 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        return (`${hours}:${minutes}`);

      }else if((time > 60*24) && (time < 60*24*2)){
        //在一天外，两天内显示 昨天**：**
        let hours = Math.abs(d.getHours() - parseInt(time/60));
        let minutes = Math.abs(d.getMinutes() - parseInt(time%60));
        hours = hours < 10 ? '0' + hours : hours; 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        return (`昨天 ${hours}:${minutes}`);

      }else if((time > 60*24*2) && (time < 60*24*365)){
        //在一年内显示 **月**日 **：**
        let months = parseInt(time/60/24/30) + d.getMonth()+1;
        let day = d.getDate() - parseInt(time/60/24);
        let hours = Math.abs(d.getHours() - parseInt(time/24/60));
        let minutes = Math.abs(d.getMinutes() - parseInt(time/24%60));
        hours = hours < 10 ? '0' + hours : hours; 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        return (`${months}月${day}日 ${hours}:${minutes}`);
      }else{
        //一年外显示 ****年**月**日 **：**
        let years = parseInt(d.getFullYear()) - parseInt(time/60/24/30/365);
        let months = parseInt(time/60/24%30) - d.getMonth() - 1;
        let day = d.getDate() - parseInt(time/60/24);
        let hours = Math.abs(d.getHours() - parseInt(time/24/60));
        let minutes = Math.abs(d.getMinutes() - parseInt(time/24%60));
        hours = hours < 10 ? '0' + hours : hours; 
        minutes = minutes < 10 ? '0' + minutes : minutes; 
        return (`${years}年${months}月${day}日 ${hours}:${minutes}`);
      }
    }

  }else {
    //请求失败
    throw new Error(result.message);
  }
  
  
}
export default{
  getSongComments
}