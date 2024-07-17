import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { nav, auth } from '@/api/index.js';
import { ElLoading } from 'element-plus';

import Layout from '@/layout/index.vue'

// import.meta.glob 懒加载
const modules = import.meta.glob('../views/**/*.vue');
export type RouteRow = {
  url: string;
  name: string;
  path?: string;
  children?: Array<RouteRow>;
  list?: Array<RouteRow>;
};

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
    title: '404',
  },
  component: () => import('@/views/common/404.vue'),
};

const defaultRoute = {
  path: '/',
  name: '',
  component: Layout,
  children: [],
};

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const fnAddDynamicMenuRoutes: any = (arr: Array<NewRouteRow>, routerPath = '/') => {
  return arr.map(item => {
    const { name, url, path } = item;
    return {
      path: `${routerPath}${url}`,
      name: item.list && item.list.length ? '' : capitalizeFirstLetter(path),
      replace: true,
      meta: {
        title: name,
      },
      component: item.list && item.list.length ? null : modules[`../views${routerPath}${url}/index.vue`],
      children: fnAddDynamicMenuRoutes(item.list || []),
    };
  });
};

/**
 * 判断是否是刷新页面进入的守卫
 */
let isRefresh = false;

const getFristPath: any = (list: RouteRow[]) => {
  let path = list.length ? list[0].path : '/';
  if (list[0].list && list[0].list.length) {
    return path += `/${getFristPath(list[0].list)}`;
  }
  return path;
};

// 路由授权
router.beforeEach((to, from, next) => {
  document.title = typeof to.meta.title === 'string' ? to.meta.title : '盈峰环境资产系统管理平台';
  if (to.name === 'login') {
    next();
    return;
  }

  // 从其他地址跳转免登陆
  if(to.query && to.query.authToken){
    auth({ authToken: to.query.authToken }).then(({ token }) => {
      sessionStorage.setItem('token', token);
      next({
        path: '/home',
        replace: true,
      });
    }).catch(() => {
      next({
        name: 'login',
        replace: true,
      });
      return;
    })
    return;
  } else if (!sessionStorage.getItem('token')) {
    // 判断是否存在token
    next({
      name: 'login',
      replace: true,
    });
    return;
  }

  // 不存在菜单和重新刷新都需要重新添加动态路由 否则页面空白
  if (!sessionStorage.getItem('menuList') || !isRefresh) {
    const loading = ElLoading.service({ lock: true });

    nav()
      .then(({ menuList, permissions, roleTypeList }) => {
        defaultRoute.children = fnAddDynamicMenuRoutes(menuList || []);
        router.addRoute(defaultRoute);
        router.addRoute(ErrorRouter);
        sessionStorage.setItem('menuList', JSON.stringify(menuList || []));
        sessionStorage.setItem('permissions', JSON.stringify(permissions || []));
        sessionStorage.setItem('roleTypeList', JSON.stringify(roleTypeList || []));
        loading.close();
        isRefresh = true;

        if (to.path === '/home') {
          next({
            path: getFristPath(menuList),
            replace: true,
          });
        } else {
          // addRoute只会添加一个新的路由， 如果新增加的路由与当前位置相匹配， 所以刷新后需要手动导航地址 防止页面白屏
          next({
            ...to,
            replace: true,
          });
        }
      })
      .catch(() => {
        loading.close();
        next({
          name: 'login',
          replace: true,
        });
      });
  } else {
    next();
  }
});

export default router;
