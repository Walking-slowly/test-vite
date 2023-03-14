# Vue 3 + TypeScript + Vite

1. **components**

```js
// 所有表单统一使用 commonForm
<commonFrom v-model="formModel" :cols="cols"/>
```
**cols** 支持拓展类型（elType）, 新建后在**element.ts**注册， 定制化请使用slot构建组件