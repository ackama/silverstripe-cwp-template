/** @type {import('eslint').Linter.Config} */
const config = {
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    commonjs: true,
    node: true
  },
  extends: ['ackama'],
  ignorePatterns: [
    '/node_modules/',
    '/vendor/',
    '/themes/watea/',
    '/themes/starter/',
    '/app/themes/silverstripe-template-theme/dist/'
  ]
};

module.exports = config;
