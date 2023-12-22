import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import type { AsyncComponentLoader } from 'vue';
import Layout from '@/layout/index.vue';
import { getMenuListBySubsystem } from '@/api/index.js';

// import.meta.glob 懒加载
const modules = import.meta.glob('../views/**/*.vue');
interface RouteRow {
  url: string;
  name: string;
  children?: Array<RouteRow>;
  keepAlive?: Boolean;
}

type NewRouteRow = RouteRow & RouteRecordRaw;

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
        },
        component: () => import('@/views/common/home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/login.vue'),
    meta: {
      title: '登录',
    },
  },
];

// 动态路由错误页面需要动态添加不能是静态路由
const ErrorRouter: RouteRecordRaw = {
  path: '/:pathMatch(.*)',
  name: '404',
  meta: {
    title: 'Pge not found',
  },
  component: () => import('@/views/common/404.vue'),
};

const defaultRoute = {
  path: '',
  name: '',
  component: Layout,
  children: [],
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const fnAddDynamicMenuRoutes: any = (arr: Array<NewRouteRow>, path = '/') => {
  return arr.map((item) => {
    const { name, url } = item;

    return {
      path: `${path}${url}`,
      name: url,
      meta: {
        title: name,
        keepAlive: !!item.keepAlive,
      },
      component: modules[`../views${path}${url}/index.vue`]
        ? defineAsyncComponent(modules[`../views${path}${url}/index.vue`] as AsyncComponentLoader)
        : null,
      children: fnAddDynamicMenuRoutes(item.children || [], `${path}${url}/`),
    };
  });
};

/**
 * 判断是否是刷新页面进入的守卫
 */
let isRefresh = false;

// 路由授权
router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    next();
    return;
  }

  // 判断是否存在token
  if (!localStorage.getItem('token')) {
    next({
      name: 'login',
      replace: true,
    });
    return;
  }

  // 不存在菜单和重新刷新都需要重新添加动态路由 否则页面空白
  if (!sessionStorage.getItem('menuList') || !isRefresh) {
    let data: Array<NewRouteRow> = [];
    try {
      data = await getMenuListBySubsystem();
    } catch (e) {
      console.error(e);
    }

    defaultRoute.children = fnAddDynamicMenuRoutes(data || []);
    router.addRoute(defaultRoute);
    router.addRoute(ErrorRouter);
    sessionStorage.setItem(
      'menuList',
      JSON.stringify([
        {
          name: '首页',
          icon: 'el-House',
          id: 1,
          url: 'home',
        },
        ...(data || []),
      ])
    );

    isRefresh = true;

    // addRoute只会添加一个新的路由， 如果新增加的路由与当前位置相匹配， 所以刷新后需要手动导航地址 防止页面白屏
    next({
      ...to,
      replace: true,
    });
  } else {
    next();
  }
});

export default router;
