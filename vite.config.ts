import path from 'path';
import { defineConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// 定义options
import DefineOptions from 'unplugin-vue-define-options/vite';

// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'

import AutoImport from 'unplugin-auto-import/vite';
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'

// mock
import { viteMockServe } from 'vite-plugin-mock';

import eslintPlugin from 'vite-plugin-eslint';

// 插件调试工具
import Inspect from 'vite-plugin-inspect';

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
          // ElementPlusResolver({ importStyle: "sass", }),
        ],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),

      // Components({
      //   dirs: ['src/components'], // default
      //   extensions: ['vue'], // default
      //   resolvers: [
      //     // 自动导入 Element Plus 组件
      //     ElementPlusResolver({ importStyle: "sass", }),

      //     // 自动注册图标组件   {prefix}-{enabledCollections}-{icon-name}
      //     IconsResolver({
      //       prefix: false,
      //       enabledCollections: ['ep']
      //     }),
      //   ],
      //   dts: path.resolve(pathSrc, 'components.d.ts'),
      // }),

      // Icons({
      //   autoInstall: true,
      //   compiler: 'vue3'
      // }),

      viteMockServe({
        mockPath: './mock',
        ignore: /^\_/, // 忽略前缀路径
        // 开发环境开启
        localEnabled: command === 'serve',
        // 生产环境
        prodEnabled: command !== 'serve',
        // prodEnabled: false,
      }),

      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.ts'],
        exclude: ['node_modules', 'dist'],
        fix: true,
      }),

      Inspect(),
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
      proxy: {
        '/salary': {
          target: 'http://10.87.106.237:9797',
          rewrite: (path) => path.replace(/^\/salary/, '/salary'),
        },
      },
    },

    resolve: {
      alias: {
        '@': pathSrc,
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },

    base: './',
  };
});
