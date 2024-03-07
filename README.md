# Vue 3 + TypeScript + Vite + elementPlus + pinia

1. **components**

```js
// 所有表单统一使用 commonForm
<commonFrom v-model="formModel" :cols="cols"/>
```

| 属性名                                                        | 说明                                                        | 类型      | 默认值 |
| ------------------------------------------------------------- | ----------------------------------------------------------- | --------- | ------ |
| elType                                                        | 可以是 elementPlus 组件名或者是公共组件名或者 custom 自定义 | string    | -      |
| span                                                          | elementPlus 栅格布局共 24 格                                | number    | 24     |
| prop                                                          | 表单需要输入的值                                            | string    | -      |
| label                                                         | 表单 name                                                   | string    | -      |
| events                                                        | elementPlus 各种组件支持的事件如：input change 等           | Object    | -      |
| cellRenderer                                                  | 自定义组件需要配置 elType: custom                           | Component | -      |
| slots                                                         | elementPlus 插槽集合                                        | Object    | -      |
| 还有继承其他 elementPlus 组件属性如：placeholder，disabled 等 | -                                                           | -         | -      |

> **cols** 支持拓展类型（elType）, 自定义公共组件在**components**文件夹创建，会统一注册， 定制化请使用 cellRenderer 构建个性化组件

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
 * 1. vscode需要安装Prettier和ESlint插件 Vue-Official
 * 2. 代码格式化需要配置vscode settings.json， 相关格式化规则（.prettierrc）
 * 3. 代码风格 （.eslintrc）
 */

{
  "editor.fontFamily": "Consolas, 'JetBrains Mono', monospace",
  "workbench.colorTheme": "Default Dark+",
  // 保存自动格式化
  "editor.formatOnSave": false,
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
