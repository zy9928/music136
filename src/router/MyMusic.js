export default{
    path: '/myMusic',
    component: () => import(/* webpackChunkName: 'myMusic' */ '../page/MyMusic/root/MyMusic.vue'),
    
  }