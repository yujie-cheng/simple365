module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    quotes: [0, 'double'],
    camelcase: [0, { properties: 'never' }],
    semi: [0, "never"],
    'array-callback-return': 0,
    'dot-notation': 0
  },
  // 全局变量
  globals: {
    __DEV__: true,
    __WECHAT__: true,
    __ALIPAY__: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true,
    getCurrentPages: true
  }
}
