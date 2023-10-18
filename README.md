# Vue 3 + TypeScript + Vite + elementPlus + pinia

1. **components**

```js
// 所有表单统一使用 commonForm
<commonFrom v-model="formModel" :cols="cols"/>
```

> **cols** 支持拓展类型（elType）, 自定义公共组件在**components**文件夹创建，会统一注册， 定制化请使用 slot 构建个性化组件

```js
// 所有表格统一使用 commonTable
<commonTable
  v-model:current-page="currentPage"
  v-model:page-size="pageSize"
  :columns="columns"
  :data="data"
  :loading="loading"
  :border="true"
  is-select
  :is-pagination="true"
  :total="total"
  @on-change-select="onSelectChange"
  @on-change-page="onChangePage"
/>
```

> 支持 **element-plus** 默认表格和虚拟滚动 <span style=" margin-left: 20px;color: red;">**注意：** 虚拟表格多选、编辑需要自己按照官网例子实现，普通表格添加配置即可</span>

2. **格式化**

> 使用**eslint**和**Prettier**解决代码风格问题

```js
/**
 * 1. vscode需要安装Prettier和ESlint插件
 * 2. 代码格式化需要配置vscode settings.json， 相关格式化规则（.prettierrc）
 * 3. 代码风格 （.eslintrc）
 */

{
  "editor.fontFamily": "Consolas, 'JetBrains Mono', monospace",
  "workbench.colorTheme": "Default Dark+",
  // 保存自动格式化
  "editor.formatOnSave": true,
  // 可以选择指定只格式化那些类型文件
  // "[vue]": {
  //     "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
  // "[javascript]": {
  //     "editor.defaultFormatter": "esbenp.prettier-vscode"
  // },
  // "[typescript]": {
  //     "editor.defaultFormatter": "esbenp.prettier-vscode"
  // }
  // 也可以选择格式化全部类型文件
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```
