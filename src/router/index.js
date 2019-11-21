import Vue from "vue";
import VueRouter from "vue-router";
import HomeChild from "./Home";
import MyMusic from "./MyMusic";
import Artist from './artist'
import Home from "./../page/Home/root/Home.vue";

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
  //朋友页面未登录
  {
    path: "/fr",
    component: () => import("../page/Friend/beforeLogin/fr")
  },

  //我的音乐登录页面
  MyMusic,
  //我的音乐未登录
  {
    path: "/my",
    component: () => import("../page/MyMusic/beforeLogin/my")
  },

  {
    path: "/play/:id",
    props: true,
    component: () =>
      import(/* webpackChunkName: 'play' */ "../page/Play/root/Play.vue")
  },
  {
    path: "/singer/:id",
    props: true,
    children: Artist,
    redirect: '/singer/:id/album',
    component: () =>
      import(/* webpackChunkName: 'singer' */ "../page/singer/root/singer.vue")
  },
  {
    path: "/user/:id",
    props: true,
    component: () =>
      import(/* webpackChunkName: 'user' */ "../page/user/root/user.vue")
  },
  {
    path: "/songList/:id",
    props: true,
    component: () =>
    import(/* webpackChunkName: 'songList' */ "../page/songList/root/songList.vue")
  },
  {
    path: "/album/:id",
    props: true,
    component: () =>
    import(/* webpackChunkName: 'album' */ "../page/album/root/album.vue")
  },
  {
    path: "/mv/:id",
    props: true,
    component: () => 
    import(/* webpackChunkName: 'mv' */ "../page/mvs/root/mv.vue")
  },
  {
    path: "/search/:type/:keywords",
    props: true,
    name: "search",
    component: () => 
    import(/* webpackChunkName: 'searchResult' */ "../page/searchResult/root/searchResult.vue")
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

router.beforeEach((to, from, next)=>{
  document.documentElement.scrollTop = 0;
  next();
})

export default router;
