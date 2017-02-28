# ES6 + Webpack 开发环境快速搭建

> [说明文档](http://books.xueboren.com/frontend/zh-cn/quick-start/es6.html)<br/>
> [示例代码](https://github.com/borenXue/QuickStart-es6.git)

* [项目简介](#项目简介)
* [操作步骤](#操作步骤)
* [温馨提示](#温馨提示)
* [碰到的问题及解决办法](#碰到的问题及解决办法)

>#### 项目简介

使用 es6 + webpack + yarn + eslint 快速搭建工程,也可以在 [GitHub](https://github.com/borenXue/QuickStart-es6.git) 上直接下载最新版本代码使用
* eslint结合webpack做代码规范检验、并结合编辑器做
* 使用 yarn 来保证该项目在任何平台上yarn install的结果一致,各个插件版本预期一致
* 使用webpack构建并提供dev模式

>#### 操作步骤

```
// 初始化git仓库并添加.gitignore
git init
vim .gitignore

// yarn init 并且 添加 MIT LICENSE
yarn init
vim LICENSE

// webpack及其相关插件安装: (所有的插件全部使用yarn本地安装,不使用全局安装)
yarn add webpack webpack-dev-server uglifyjs-webpack-plugin --dev
// 压缩es5: yarn add uglify-js --dev
// 压缩es6: yarn add git://github.com/mishoo/UglifyJS2#harmony --dev
// babel 相关插件
yarn add babel babel-loader babel-core babel-preset-es2015 babel-plugin-transform-runtime --dev
// eslint 相关插件
yarn add eslint babel-eslint eslint-loader eslint-plugin-standard eslint-plugin-promise eslint-config-standard eslint-friendly-formatter --dev
// istanbul、mocha 相关插件
yarn add istanbul webpack-istanbul-plugin istanbul-instrumenter-loader mocha-loader --dev

// 编辑webpack配置文件并测试
vim webpack.conf.js

// 添加yarn run 脚本:package.json
"scripts": {
"dev": "export NODE_ENV=development && webpack-dev-server --inline --hot --colors --progress --config webpack.conf.js",
"build": "export NODE_ENV=production && webpack --config webpack.conf.js",
"eslint": "eslint --format 'node_modules/eslint-friendly-formatter' src/index.js",
"eslint:html": "eslint --format html ./src/* -o ./dist/eslint/index.html"
}

// 初始化项目文件 src/index.js
mkdir src; vim src/index.js;
// 运行开发脚本
yarn run dev
```

>#### 温馨提示

* Eslint 结合编辑器做代码时实检验: [可参考这里](../FrontendEngineering/Eslint-Install.md)
* 如果运行yarn run dev的过程中报错,也有可能是 webpack2.x 不完全兼容1.x导致的([可参考这里](https://webpack.js.org/guides/migrating/))

>#### 碰到的问题及解决办法

* unknown property 'preLoaders':
webpack版本问题,使用1.x版本就ok
webpack2.x中 preLoaders使用enforce: 'pre'替代
* ERROR in ./src/WeiyiStatSDK.js Module build failed: Error: The node API for `babel` has been moved to `babel-core`.
loader:'babel' 该写法在webpack1.x中ok
但是webpack2.x中要写成loader: 'babel-loacer'
【module名称后自动自动补全 -loader的功能将被移除】
* `·configuration has an unknown property 'eslint'.`<br/>
【webpack2不再支持类似config.eslint的语法,这些配置都要使用LoaderOptionsPlugin来加载 】
```
new webpack.LoaderOptionsPlugin({
eslint: {
configFile: path.join(__dirname, '.eslintrc.js'),
formatter: require('eslint-friendly-formatter'),
useEslintrc: false
}
})
```
