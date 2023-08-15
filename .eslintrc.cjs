module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module', //Allowsfortheuseofimports
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: ['plugin:vue/vue3-recommended'],
  rules: {
    'no-var': 1, // 不允许使用var
    'no-unused-vars': [1, { "args": "none" }], //不允许有声明后未被使用的变量或参数
    'vue/multi-word-component-names': 0, // 关闭组件名称校验
    // 关闭在标签前后需要换行
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'no-debugger': 1, //不允许使用debugger
    'no-dupe-keys': 1, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 1, //函数参数不能重复
    'no-empty': 1, //块语句中的内容不能为空
    'no-labels': 1, //禁止标签声明
    'no-multi-spaces': 1, //不能用多余的空格
    'no-redeclare': 1, //禁止重复声明变量
    'no-trailing-spaces': 1, //一行结束后面不要有空格
    'arrow-spacing': 1, //=>的前/后括号
    'camelcase': 0, //取消强制驼峰法命名
    "eqeqeq": 1, //使用全等
  }
}
