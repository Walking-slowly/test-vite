import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'
import { getMenuListBySubsystem } from '@/api/index.js'

interface RouteRow {
  url: String,
  name: String,
  children?: Array<RouteRow>
}

type NewRouteRow = RouteRow & RouteRecordRaw

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: Layout,
    children: [{
      path: '/home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/views/common/home.vue'),
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: { title: '404' },
    component: () => import('@/views/common/404.vue')
} 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const defaultRoute = {
  path: '',
  name: '',
  component: Layout,
  children: []
}

const fnAddDynamicMenuRoutes: any = (arr: Array<NewRouteRow>, path = '/') => {
  return arr.map(item => {
    const { name, url } = item

    return {
      path: `${path}${url}`,
      name: url,
      meta: {title: name},
      component: () => import(`@/views/${url}/index.vue`),
      children: fnAddDynamicMenuRoutes(item.children || [])
    }
  })
}

// 路由授权
router.beforeEach((to, from, next) => {
  if(to.path === '/home' || to.path === '/') {
    getMenuListBySubsystem().then((data: any) => {
      defaultRoute.children = fnAddDynamicMenuRoutes(data)
      router.addRoute(defaultRoute)
      console.log(router, '111')
      sessionStorage.setItem('menuList', JSON.stringify([{
        name: '首页',
        icon: 'home',
        id: 1,
        url: 'home'
      }, ...data]))
      next()
    })
  } else {
    next()
  }
})


 
export default router
