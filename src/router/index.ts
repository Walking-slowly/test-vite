import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'
import { getMenuListBySubsystem } from '@/api/index.js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/text/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    meta: { title: '登录' }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

// 路由授权
router.beforeEach((to,from,next) => {
  if(to.path === '/home') {
    getMenuListBySubsystem().then((data: any) => {
      sessionStorage.setItem('menuList', JSON.stringify(data))
    })
  }
  next()
})
 
export default router
