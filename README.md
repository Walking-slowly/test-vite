# **commonjs** 和 **es modules**的区别
**commonjs**

```
  1.同步加载，会阻塞代码
  2.现在浏览器不支持commonjs需要打包工具转换
```
**es modules**
```
  1.异步加载
  2.现在浏览器原生支持
```

# 为啥使用vite而不是webpack
```
  vite原生就支持esm，esm是vite的一等公民非常契合现在浏览器，尽管现在webpack也支持esm，但是需要配置，而且webpack启动时必须先打包整个应用（包括依赖和源码），vite直接启动一个ESM服务器，浏览器按需请求文件。依赖通过 esbuild 预构建为 ESM，源码文件按需编译，所以vite比webpack更快。ESM 是 Vite 快的核心原因，但不仅仅是 ESM。
```

# 使用pnpm多项目管理
```
  一个仓库同时管理多个项目，把公共组件，公共请求，公共样式，公共eslint, 公共prettier等单独提取到一个项目中，项目之间没有关联，后期如果需要新增项目，可以使用同一套组件，方便后期维护，统一框架，统一样式，统一代码规范。
```

# 使用unbuild配合pnpm
```ts
  unbuild定位在于类或者库的打包，不适合应用级打包，不像vite那样支持或者配置css压缩，图片压缩，包分隔，所以pnpm中公共eslint等配置可以使用unbuild打包出esm文件，.d.ts文件方便vite直接引入使用，而且配置非常简单

  // build.config.ts
  import { defineBuildConfig } from 'unbuild';

  export default defineBuildConfig({
    entries: ['src/index'],
    declaration: true, // 自动生成 .d.ts
  });
```
