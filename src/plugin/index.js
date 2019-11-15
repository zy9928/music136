import Comment from '../components/comments/comment';
import MyWindow from "../components/my-window/my-window";

export default{
  install(Vue) {

    Vue.component(Comment.name, Comment);
    Vue.component(MyWindow.name,MyWindow);
  }
  
}