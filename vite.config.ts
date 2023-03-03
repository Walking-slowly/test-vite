import path from "path";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from 'vite-plugin-mock'

import Inspect from 'vite-plugin-inspect'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      // 自动导入vue相关函数
      imports: ['vue'],

      resolvers: [
        // 自动导入 Element Plus 指令方法
        ElementPlusResolver({ importStyle: "sass", }),
      ],
      
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),

    Components({
      dirs: ['src/components'], // default
      extensions: ['vue'], // default
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver({ importStyle: "sass", }),

        // 自动注册图标组件   {prefix}-{enabledCollections}-{icon-name}
        IconsResolver({ 
          prefix: false, 
          enabledCollections: ['ep'] 
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),

    Icons({ 
      autoInstall: true,
      compiler: 'vue3'
    }),

    viteMockServe({
      mockPath: './mock',
      localEnabled: true
    }),

    Inspect()
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },

  server:{
    host:'0.0.0.0',
    port: 8080,
    open: true,
    proxy:{}
  },

  resolve: {
    alias: {
      "@": pathSrc
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  base: './'
})
