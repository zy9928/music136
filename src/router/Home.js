export default [
  {
    path: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ './../page/Home/stair/recommend.vue')
  },
  {
    path: 'topList',
    component: () => import(/* webpackChunkName: "topList" */ './../page/Home/stair/topList.vue')
  },
  {
    path: 'sonListPage',
    component: () => import(/* webpackChunkName: "sonListPage" */ './../page/Home/stair/sonListPage.vue')
  },
  {
    path: 'station',
    component: () => import(/* webpackChunkName: "station" */ './../page/Home/stair/station.vue')
  },
  {
    path: 'songerPage',
    component: () => import(/* webpackChunkName: "songerPage" */ './../page/Home/stair/songerPage.vue')
  },
  {
    path: 'newCD',
    component: () => import(/* webpackChunkName: "newCD" */ './../page/Home/stair/newCD.vue')
  },
]