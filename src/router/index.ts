import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const Layout = () => import('@/layout/index.vue');
import { nav } from '@/api/index.js';

// import.meta.glob 懒加载
const modules = import.meta.glob('../views/**/*.vue');
interface RouteRow {
  url: string;
  name: string;
  children?: Array<RouteRow>;
  list?: Array<RouteRow>;
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

const fnAddDynamicMenuRoutes: any = (arr: Array<NewRouteRow>, routerPath = '/') => {
  return arr.map((item) => {
    const { name, path, url } = item;
    return {
      path: `${routerPath}${path}`,
      name: path,
      meta: {
        title: name,
        keepAlive: !!item.keepAlive,
      },
      component: !item.list ? modules[`../views/${url}/index.vue`] : null,
      children: fnAddDynamicMenuRoutes(item.list || [], `${routerPath}${path}/`),
    };
  });
};

/**
 * 判断是否是刷新页面进入的守卫
 */
let isRefresh = false;

// 路由授权
router.beforeEach(async (to, from, next) => {
  console.log(111);
  if (to.name === 'login') {
    next();
    return;
  }

  // 判断是否存在token
  if (!sessionStorage.getItem('token')) {
    next({
      name: 'login',
      replace: true,
    });
    return;
  }

  // 不存在菜单和重新刷新都需要重新添加动态路由 否则页面空白
  if (!sessionStorage.getItem('menuList') || !isRefresh) {
    let { menuList, permissions, roleTypeList } = await nav();
    defaultRoute.children = fnAddDynamicMenuRoutes(menuList || []);
    router.addRoute(defaultRoute);
    router.addRoute(ErrorRouter);
    sessionStorage.setItem('menuList', JSON.stringify(menuList || []));
    sessionStorage.setItem('permissions', JSON.stringify(permissions || []));
    sessionStorage.setItem('roleTypeList', JSON.stringify(roleTypeList || []));

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
