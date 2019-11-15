import Comment from '../components/comments/comment';
import MyWindow from "../components/my-window/my-window";
import Artist from '../components/artist50/artist';
import { Pagination, Button, ButtonGroup, Dropdown, DropdownItem } from 'element-ui';
export default{
  install(Vue) {
    Vue.component(Pagination.name, Pagination);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(Button.name, Button);
    Vue.component(Comment.name, Comment);
    Vue.component(MyWindow.name, MyWindow);
    Vue.component(Artist.name, Artist);
  }
  
}