// ts和js相互引入，相当于识别声明
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.tsx' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface Screenfull {
  isFullscreen: boolean;
  toggle: Function;
  on: Function;
  off: Function;
  // 更多属性根据实际情况添加
}
declare module 'screenfull' {
  const screenfull: Screenfull;
  export default screenfull;
}

declare module '@/api/*.js';
declare module '@/store/*.ts';
declare module '@/components/index.ts';
declare module '@/hook/*.ts';
declare module '@/router/*.ts';
declare module '@/store/*.js';
declare module '@/utils/*.js';
// declare module '../mock/*.ts';
declare module 'element-plus/dist/locale/zh-cn.mjs';
