const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isPro = process.env.NODE_ENV === 'production'

const plugins = [
  new HtmlWebpackPlugin({
    filename: 'auto_test.html',
    template: 'test/e2e/html/auto_test.html',
    inject: true,
    chunks: [ 'auto_test' ]
  })
]

if (isPro) {
  plugins.push(new UglifyJSPlugin())
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin())
  plugins.push(new webpack.NoEmitOnErrorsPlugin())
}
plugins.push(new webpack.LoaderOptionsPlugin({
  eslint: {
    configFile: path.join(__dirname, '.eslintrc.js'),
    formatter: require('eslint-friendly-formatter'),
    useEslintrc: false
  }
}))

module.exports = {
  entry: {
    'tools_js': path.resolve(__dirname, './src/index.js'),
    'auto_test': path.resolve(__dirname, './test/e2e/html/auto_test.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '',
    filename: isPro ? '[name]-[hash:7].js' : '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components|dist)/,
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /(node_modules|bower_components|dist)/
      }
    ]
  },
  plugins
}
