import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
* icon : the icon show in the sidebar
* hidden : if `hidden:true` will not show in the sidebar
* redirect : if `redirect:noredirect` will no redirct in the levelbar
* noDropdown : if `noDropdown:true` will has no submenu
* meta : { role: ['admin'] }  will control the page role
**/
export const constantRouterMap = [
    { path: '/login', component: _import('login/index'), hidden: true },
    { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    hidden: true,
    children: [{ path: 'dashboard', component: _import('dashboard/index') }]
  },
  {
    path: '/user/updatepwd',
    component: Layout,
    redirect: 'user/updatepwd',
    icon: 'people',
    noDropdown: true,
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/extend/agent',
    component: Layout,
    icon: 'table',
    meta: { role: ['admin'] },
    noDropdown: true,
    children: [
      {
        path: 'index', component: _import('extend/agent/index'), name: 'Agent', meta: { role: ['admin'] }
      }
    ]
  },
  {
    path: '/extend/pick',
    component: Layout,
    icon: 'table',
    redirect: '/extend/pick',
    name: 'Room',
    meta: {
      title: 'Room',
      icon: 'component',
      role: ['admin']
    },
    alwaysShow: true,
    children: [{ path: 'index', component: _import('extend/pick/index'), name: 'Room Overall' },
      { path: 'index', component: _import('extend/pick/index'), name: 'Room List' }]
  },
  {
    path: '/extend/player',
    component: Layout,
    icon: 'table',
    name: 'Member',
    redirect: '/extend/player',
    meta: { role: ['admin'] },
    alwaysShow: true,
    children: [
      { path: 'index', component: _import('extend/player/index'), name: 'Member Setup' },
      { path: 'index', component: _import('extend/player/index'), name: 'Member List' }
    ]
  },
  {
    path: '/extend/log',
    component: Layout,
    name: 'Maintenance',
    icon: 'table',
    meta: { role: ['admin'] },
    alwaysShow: true,
    children: [
      { path: 'index', component: _import('extend/log/index'), name: 'Administrator List' },
      { path: 'index', component: _import('extend/log/index'), name: 'Money Change Record' }
    ]
  },
  {
    path: '/extend/user/',
    component: Layout,
    icon: 'table',
    hidden: true,
    noDropdown: true,
    children: [{ path: 'index', component: _import('extend/user/index'), name: '修改密码' }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
