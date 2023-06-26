// vite.config.ts
import path from "path";
import { defineConfig } from "file:///F:/test-vite/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/test-vite/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/test-vite/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import DefineOptions from "file:///F:/test-vite/node_modules/unplugin-vue-define-options/dist/vite.mjs";
import AutoImport from "file:///F:/test-vite/node_modules/unplugin-auto-import/dist/vite.js";
import { viteMockServe } from "file:///F:/test-vite/node_modules/vite-plugin-mock/dist/index.js";
import eslintPlugin from "file:///F:/test-vite/node_modules/vite-plugin-eslint/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///F:/test-vite/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "F:\\test-vite";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      DefineOptions(),
      AutoImport({
        imports: ["vue", "vue-router"],
        resolvers: [],
        dts: path.resolve(pathSrc, "auto-imports.d.ts")
      }),
      viteMockServe({
        mockPath: "./mock",
        ignore: /^\_/,
        localEnabled: command === "serve",
        prodEnabled: command !== "serve"
      }),
      eslintPlugin({
        cache: false,
        include: ["src/**/*.vue", "src/**/*.ts"],
        exclude: ["node_modules", "dist"],
        fix: true
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[name]"
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 8081,
      open: true,
      proxy: {
        "/salary": {
          target: "http://10.87.106.237:9797",
          rewrite: (path2) => path2.replace(/^\/salary/, "/salary")
        }
      }
    },
    resolve: {
      alias: {
        "@": pathSrc
      },
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    base: "./"
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFx0ZXN0LXZpdGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHRlc3Qtdml0ZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovdGVzdC12aXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgQ29uZmlnRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4JztcclxuLy8gXHU2M0QyXHU0RUY2XHU4QzAzXHU4QkQ1XHU1REU1XHU1MTc3XHJcbi8vIGltcG9ydCBJbnNwZWN0IGZyb20gJ3ZpdGUtcGx1Z2luLWluc3BlY3QnO1xyXG5cclxuLy8gXHU1QjlBXHU0RTQ5b3B0aW9uc1xyXG5pbXBvcnQgRGVmaW5lT3B0aW9ucyBmcm9tICd1bnBsdWdpbi12dWUtZGVmaW5lLW9wdGlvbnMvdml0ZSc7XHJcblxyXG4vLyBpbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuLy8gaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXHJcblxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcclxuLy8gaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuLy8gaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuLy8gaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJ3VucGx1Z2luLWVsZW1lbnQtcGx1cy92aXRlJ1xyXG5cclxuLy8gbW9ja1xyXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XHJcbi8vIGVzbGludFx1NjgyMVx1OUE4Q1xyXG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCc7XHJcbi8vIHN2Z1xyXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucyc7XHJcblxyXG5jb25zdCBwYXRoU3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfTogQ29uZmlnRW52KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIHZ1ZUpzeCgpLFxyXG4gICAgICBEZWZpbmVPcHRpb25zKCksXHJcbiAgICAgIC8vIEVsZW1lbnRQbHVzKHsgdXNlU291cmNlOiB0cnVlIH0pLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcclxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXHJcblxyXG4gICAgICAgIHJlc29sdmVyczogW1xyXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTYzMDdcdTRFRTRcdTY1QjlcdTZDRDVcclxuICAgICAgICAgIC8vIEVsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogXCJzYXNzXCIsIH0pLFxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdhdXRvLWltcG9ydHMuZC50cycpLFxyXG4gICAgICB9KSxcclxuXHJcbiAgICAgIC8vIENvbXBvbmVudHMoe1xyXG4gICAgICAvLyAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSwgLy8gZGVmYXVsdFxyXG4gICAgICAvLyAgIGV4dGVuc2lvbnM6IFsndnVlJ10sIC8vIGRlZmF1bHRcclxuICAgICAgLy8gICByZXNvbHZlcnM6IFtcclxuICAgICAgLy8gICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XHJcbiAgICAgIC8vICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKHsgaW1wb3J0U3R5bGU6IFwic2Fzc1wiLCB9KSxcclxuXHJcbiAgICAgIC8vICAgICAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjYgICB7cHJlZml4fS17ZW5hYmxlZENvbGxlY3Rpb25zfS17aWNvbi1uYW1lfVxyXG4gICAgICAvLyAgICAgSWNvbnNSZXNvbHZlcih7XHJcbiAgICAgIC8vICAgICAgIHByZWZpeDogZmFsc2UsXHJcbiAgICAgIC8vICAgICAgIGVuYWJsZWRDb2xsZWN0aW9uczogWydlcCddXHJcbiAgICAgIC8vICAgICB9KSxcclxuICAgICAgLy8gICBdLFxyXG4gICAgICAvLyAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdjb21wb25lbnRzLmQudHMnKSxcclxuICAgICAgLy8gfSksXHJcblxyXG4gICAgICAvLyBJY29ucyh7XHJcbiAgICAgIC8vICAgYXV0b0luc3RhbGw6IHRydWUsXHJcbiAgICAgIC8vICAgY29tcGlsZXI6ICd2dWUzJ1xyXG4gICAgICAvLyB9KSxcclxuXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnLi9tb2NrJyxcclxuICAgICAgICBpZ25vcmU6IC9eXFxfLywgLy8gXHU1RkZEXHU3NTY1XHU1MjREXHU3RjAwXHU4REVGXHU1Rjg0XHJcbiAgICAgICAgLy8gXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU1RjAwXHU1NDJGXHJcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxyXG4gICAgICAgIC8vIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1xyXG4gICAgICAgIHByb2RFbmFibGVkOiBjb21tYW5kICE9PSAnc2VydmUnLFxyXG4gICAgICAgIC8vIHByb2RFbmFibGVkOiBmYWxzZSxcclxuICAgICAgfSksXHJcblxyXG4gICAgICBlc2xpbnRQbHVnaW4oe1xyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLnZ1ZScsICdzcmMvKiovKi50cyddLFxyXG4gICAgICAgIGV4Y2x1ZGU6IFsnbm9kZV9tb2R1bGVzJywgJ2Rpc3QnXSxcclxuICAgICAgICBmaXg6IHRydWUsXHJcbiAgICAgIH0pLFxyXG5cclxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICAgIGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL3N2ZycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW25hbWVdJyxcclxuICAgICAgfSksXHJcblxyXG4gICAgICAvLyBJbnNwZWN0KCksXHJcbiAgICBdLFxyXG5cclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiQC9zdHlsZXMvZWxlbWVudC5zY3NzXCIgYXMgKjtgLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHBvcnQ6IDgwODEsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9zYWxhcnknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTAuODcuMTA2LjIzNzo5Nzk3JyxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9zYWxhcnkvLCAnL3NhbGFyeScpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGhTcmMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc3gnLCAnLnRzJywgJy50c3gnXSxcclxuICAgIH0sXHJcblxyXG4gICAgYmFzZTogJy4vJyxcclxuICB9O1xyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwTixPQUFPLFVBQVU7QUFDM08sU0FBUyxvQkFBK0I7QUFDeEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUtuQixPQUFPLG1CQUFtQjtBQUsxQixPQUFPLGdCQUFnQjtBQU12QixTQUFTLHFCQUFxQjtBQUU5QixPQUFPLGtCQUFrQjtBQUV6QixTQUFTLDRCQUE0QjtBQXZCckMsSUFBTSxtQ0FBbUM7QUF5QnpDLElBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUc3QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLFFBQVEsTUFBaUI7QUFDdEQsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsY0FBYztBQUFBLE1BRWQsV0FBVztBQUFBLFFBRVQsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLFFBRTdCLFdBQVcsQ0FHWDtBQUFBLFFBRUEsS0FBSyxLQUFLLFFBQVEsU0FBUyxtQkFBbUI7QUFBQSxNQUNoRCxDQUFDO0FBQUEsTUF1QkQsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBRVIsY0FBYyxZQUFZO0FBQUEsUUFFMUIsYUFBYSxZQUFZO0FBQUEsTUFFM0IsQ0FBQztBQUFBLE1BRUQsYUFBYTtBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsU0FBUyxDQUFDLGdCQUFnQixhQUFhO0FBQUEsUUFDdkMsU0FBUyxDQUFDLGdCQUFnQixNQUFNO0FBQUEsUUFDaEMsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUFBLE1BRUQscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ3hELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUdIO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxXQUFXO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxhQUFhLFNBQVM7QUFBQSxRQUN4RDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLO0FBQUEsTUFDUDtBQUFBLE1BQ0EsWUFBWSxDQUFDLE9BQU8sUUFBUSxPQUFPLE1BQU07QUFBQSxJQUMzQztBQUFBLElBRUEsTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
