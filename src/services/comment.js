import api from '../utils/api'
import Http from '../utils/Http'

//请求歌曲评论
export const getSongComments = async () => {
  //发送请求
  const {data: result} = await Http.get(api.SONG_COMMENT, {id: 186016});
  if(result.code == 200){
    //请求成功
    // console.log(result);
    
  }else {
    //请求失败
    throw new Error(result.message);
  }
  
  
}
export default{
  getSongComments
}