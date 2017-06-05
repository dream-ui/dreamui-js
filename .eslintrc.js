module.exports = {
  env: {
    browser: true,
    es6: true
  },
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  globals: {
  },
  extends: 'standard',
  plugins: [],
  settings: {
    "import/external-module-folders": ["src", "node_modules"],
    "external-module-folders": ["./src", "node_modules"]
  },
  // 少加自己的规则
  'rules': {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'semi': 1,
    'no-trailing-spaces': 1,

    'import/no-unresolved': [2, {commonjs: true, amd: true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
