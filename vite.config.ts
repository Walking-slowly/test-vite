import path from 'path';
import { defineConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import AutoImport from 'unplugin-auto-import/vite';

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

      eslintPlugin({
        include: ['src/**/*.vue', 'src/**/*.ts'],
        exclude: ['node_modules', 'dist'],
      }),

      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[name]',
      }),
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
          // target: 'http://10.87.106.237:9696', // 测试环境
          // target: 'http://10.54.6.19:9696', // 生产
          target: 'http://10.87.108.11:9696', // 李准
          // target: 'http://10.87.108.51:9696', // 郑康
          rewrite: path => path.replace(/^\/assets/, '/assets'),
        },
      },
    },

    resolve: {
      alias: {
        '@': pathSrc,
      },
    },

    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },

    base: './',
    build: {
      outDir: 'assets',
      assetsDir: 'static',
      sourcemap: false,
    },
  };
});
