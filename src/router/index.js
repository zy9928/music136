import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./../page/Home/root/Home.vue";
import HomeChild from "./Home";
import MyMusic from "./MyMusic";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    children: HomeChild,
    redirect: "/home/recommend"
  },
  {
    path: "/friend",
    component: () =>
      import(/* webpackChunkName: 'friend' */ "../page/Friend/root/Friend.vue")
  },

  //我的音乐登录页面
  MyMusic,
  //我的音乐未登录
  {
    path:"/my",
    component:()=>import("../page/MyMusic/beforeLogin/my")
  },

  {
    path: "/play",
    component: () =>
      import(/* webpackChunkName: 'play' */ "../page/Play/root/Play.vue")
  },
  {
    path: "**",
    component: () =>
      import(/* webpackChunkName: 'notFound' */ "./../page/notFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
