export default [
  {
    path: 'list',
    name: 'list',
    component:()=> import(/* webpackChunkName: "sonListPage" */'./../page/singer/sonList/artistList')
  },
  {
    path: 'album',
    component:()=> import(/* webpackChunkName: "sonListPage" */'./../page/singer/sonList/artistAlbum')
  },
  {
    path: 'mv',
    component:()=> import(/* webpackChunkName: "sonListPage" */'./../page/singer/sonList/artistMv')
  },
  {
    path: 'desc',
    component:()=> import(/* webpackChunkName: "sonListPage" */'./../page/singer/sonList/artistDesc')
  }
]
 
  
