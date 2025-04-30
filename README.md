# **commonjs** 和 **es modules**的区别
**commonjs**

```
  1.同步加载，会阻塞代码
  2.现在浏览器不支持commonjs需要打包工具转换
  ...
```
**es modules**
```
  1.异步加载
  2.现在浏览器原生支持
  ...
```

# 为什么使用vite而不是webpack
```
  vite原生就支持esm【es modules】，esm是vite的一等公民非常契合现在浏览器，尽管现在webpack也支持esm，但是需要配置，而且webpack启动时必须先打包整个应用（包括依赖和源码），vite直接启动一个ESM服务器，浏览器按需请求文件。依赖通过 esbuild 预构建为 ESM，源码文件按需编译，所以vite比webpack更快。ESM 是 Vite 快的核心原因，但不仅仅是 ESM。
  1. 开发启动速度极快
    Webpack：启动时需要打包整个应用（尤其是大型项目），依赖越多越慢。
    Vite：基于原生 ES Modules，直接按需编译浏览器请求的文件。
  2. 热更新（HMR）效率高
    Webpack：修改文件后需重新构建受影响的部分模块，项目越大速度越慢。
    Vite：HMR 直接在原生 ESM 上运行，仅更新修改的模块。
  3. 原生支持现代浏览器特性
    Vite：默认使用 ES Modules，直接利用浏览器原生能力，无需打包即可开发。
    Webpack：需配置。
  4. 对新兴技术的友好性
    Vite：天然支持 Vue 3、React Fast Refresh、Svelte 等，生态插件（如 @vitejs/plugin-react）更轻量。
    Webpack：需依赖社区插件（如 babel-loader），调试成本较高。
```
# 为什么使用pnpm
```
  1. pnpm比npm 和 yarn更快，可以节约磁盘空间并提升安装速度，比如之前安装过的包，会统一存放到一个公共的地方，再次在别的项目安装时候会进行一个软链接，这样就节约了磁盘空间
  2. 原生支持monorepo，无需第三方工具
```
# 使用pnpm多项目管理
```
  一个仓库同时管理多个项目，把公共组件，公共请求，公共样式，公共eslint, 公共prettier等单独提取到一个项目中，项目之间没有关联，后期如果需要新增项目，可以使用同一套组件，方便后期维护，统一框架，统一样式，统一代码规范。
  1. 每层独立项目共享工具链，共享请求组件，共享eslint代码检查，共享prettier代码规范化，统一代码
  2. 公共依赖存放根目录安装一次，子项目无需安装，如果eslint， prettier，vite, axios等
  3. 组件复用，对公共表单组件添加管道，随意组合ele或者antd等ui组件，不同项目通过公共表单配置可以使用不同得ui组件，整体样式都是一样
  4. 统一构建，统一打包；可以单独命令打包/构建对应得项目，也可以使用turbo一键构建/打包所有的项目
  5. 修改公共组件，公共请求，所有项目立即生效，不用像挂在npm上的依赖一样还需要先发布
```

# 使用unbuild配合pnpm
```ts
  unbuild定位在于类或者库的打包，不适合应用级打包，不像vite那样支持或者配置css压缩，图片压缩，包分离，所以pnpm中公共eslint等配置可以使用unbuild打包出esm文件，.d.ts文件方便vite直接引入使用，而且配置非常简单

  // build.config.ts
  import { defineBuildConfig } from 'unbuild';

  export default defineBuildConfig({
    entries: ['src/index'],
    declaration: true, // 自动生成 .d.ts
  });
```

# vite性能优化
```
  1. 减少解析操作, 填写后缀，vite会按照顺序依次查找当后缀不明确时['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx']
  2. 避免使用桶文件，尽量按需导入
  3. 预热常用文件，比如公共组件，菜单栏
  4. 使用postcss
  5. 使用esm文件
```
