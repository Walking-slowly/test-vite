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
t;

declare module '@/api/*.js';
declare module '@/store/*.ts';
declare module '@/hook/*.ts';
declare module '@/utils/*.js';
declare module '../mock/*.ts';
declare module 'element-plus/dist/locale/zh-cn.mjs';
