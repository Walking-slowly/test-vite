# Vue 3 + TypeScript + Vite + elementPlus + pinia

1. **components**

```js
// 所有表单统一使用 commonForm
<commonFrom v-model="formModel" :cols="cols"/>
```

> **cols** 支持拓展类型（elType）, 自定义公共组件在**components**文件夹创建，会统一注册， 定制化请使用 slot 构建个性化组件

```js
// 所有表格统一使用 commonTable
<commonTable />
```

> 支持 **element-plus** 默认表格和虚拟滚动

2. **格式化**

> 使用**eslint**和**Prettier**解决代码风格问题

```js
/**
 * 1. vscode需要安装Prettier和ESlint插件
 * 2. 代码格式化需要配置vscode settings.json， 相关格式化规则（.prettierrc）
 * 3. 代码风格 （.eslintrc）
 */

{
  "workbench.statusBar.visible": false,
  "editor.fontFamily": "Consolas, 'JetBrains Mono', monospace",
  "aicontext.personalContext": "",
  "workbench.colorTheme": "Default Dark+",
  "editor.tabSize": 2,
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
