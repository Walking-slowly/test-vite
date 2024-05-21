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

    // 预构建
    optimizeDeps: {
      include: [
        'vue',
        'element-plus/es/components/form/style/index',
        'element-plus/es/components/radio-group/style/index',
        'element-plus/es/components/radio/style/index',
        'element-plus/es/components/checkbox/style/index',
        'element-plus/es/components/checkbox-group/style/index',
        'element-plus/es/components/switch/style/index',
        'element-plus/es/components/time-picker/style/index',
        'element-plus/es/components/date-picker/style/index',
        'element-plus/es/components/col/style/index',
        'element-plus/es/components/form-item/style/index',
        'element-plus/es/components/alert/style/index',
        'element-plus/es/components/breadcrumb/style/index',
        'element-plus/es/components/select/style/index',
        'element-plus/es/components/select-v2/style/index',
        'element-plus/es/components/input/style/index',
        'element-plus/es/components/input-number/style/index',
        'element-plus/es/components/breadcrumb-item/style/index',
        'element-plus/es/components/tag/style/index',
        'element-plus/es/components/pagination/style/index',
        'element-plus/es/components/table/style/index',
        'element-plus/es/components/table-column/style/index',
        'element-plus/es/components/card/style/index',
        'element-plus/es/components/row/style/index',
        'element-plus/es/components/button/style/index',
        'element-plus/es/components/button-group/style/index',
        'element-plus/es/components/menu/style/index',
        'element-plus/es/components/sub-menu/style/index',
        'element-plus/es/components/menu-item/style/index',
        'element-plus/es/components/option/style/index',
        '@element-plus/icons-vue',
        'pinia',
        'axios',
        'vue-router',
        '@vueuse/core',
      ],
    },

    base: command === 'build' ? './' : '/',
    build: {
      cssCodeSplit: false,
      sourcemap: false,
      outDir: 'assets',
      assetsDir: 'static',
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
