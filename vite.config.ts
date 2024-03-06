import path from 'path';
import { defineConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// 插件调试工具
// import Inspect from 'vite-plugin-inspect';

// 定义options node 14.19.0 unplugin-vue-define-options 1.1.4 我是试过安装1.2.0以及更高版本会提示找不到模块
import DefineOptions from 'unplugin-vue-define-options/vite';

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite';
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'

// mock
// import { viteMockServe } from 'vite-plugin-mock';
// eslint校验
import eslintPlugin from 'vite-plugin-eslint';
// svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const pathSrc = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      // ElementPlus({ useSource: true }),
      AutoImport({
        // 自动导入vue相关函数
        imports: ['vue', 'vue-router'],

        resolvers: [
          // 自动导入 Element Plus 指令方法
          // ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),

      // 自动导入无法使用vue内置component
      // Components({
      //   dirs: ['src/components'], // default
      //   extensions: ['vue'], // default
      //   resolvers: [
      //     // // 自动导入 Element Plus 组件
      //     // ElementPlusResolver(),
      //     // // 自动注册图标组件   {prefix}-{enabledCollections}-{icon-name}
      //     // IconsResolver({
      //     //   prefix: false,
      //     //   enabledCollections: ['ep']
      //     // }),
      //   ],
      //   dts: path.resolve(pathSrc, 'components.d.ts'),
      // }),

      // Icons({
      //   autoInstall: true,
      //   compiler: 'vue3'
      // }),

      // viteMockServe({
      //   mockPath: './mock',
      //   ignore: /^\_/, // 忽略前缀路径
      //   // 开发环境开启
      //   localEnabled: command === 'serve',
      //   // 生产环境
      //   // prodEnabled: command !== 'serve',
      //   prodEnabled: false,
      // }),

      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts'],
        exclude: ['node_modules', 'dist'],
        fix: true,
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
      }),

      // Inspect(),
    ],

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`,
        },
      },
    },

    server: {
      host: '0.0.0.0',
      port: 8081,
      open: true,
      hmr: true,
      proxy: {
        '/assets': {
          target: 'http://10.87.108.11:9797', // 李准
          rewrite: path => path.replace(/^\/assets/, '/assets'),
        },
      },
    },

    resolve: {
      alias: {
        '@': pathSrc,
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      __VUE_PROD_DEVTOOLS__: false,
    },

    // 预构建
    optimizeDeps: {
      include: ['vue', 'pinia', 'axios', 'vue-router', 'element-plus', '@element-plus/icons-vue'],
    },

    base: process.env.NODE_ENV === 'production' ? './' : '/',
  };
});
