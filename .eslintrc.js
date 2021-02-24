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
  extends: ['ackama']
};

module.exports = config;
