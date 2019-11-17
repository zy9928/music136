import Comment from '../components/comments/comment';
import MyWindow from "../components/my-window/my-window";
import { Pagination, Button, ButtonGroup, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
export default{
  install(Vue) {
    Vue.component(Pagination.name, Pagination);
    Vue.component(ButtonGroup.name, ButtonGroup);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownItem.name, DropdownItem);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(Button.name, Button);
    Vue.component(Comment.name, Comment);
    Vue.component(MyWindow.name, MyWindow);
  }
  
}