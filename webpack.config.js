// Webpack configuration
const path = require('path')
const webpack = require('webpack')
const NotifierPlugin = require('webpack-notifier')

var outputFile, plugins = []

if (process.env.npm_lifecycle_event === 'dist') {
  outputFile = 'app.min.js'
  plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {warnings: false},
    output: {comments: false},
    mangle: true,
    comments: false
  }))
} else {
  outputFile = 'app.js'
}

plugins.push(new NotifierPlugin({
  title: outputFile,
  alwaysNotify: true,
}))

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {test: /\.js$/, loader: 'babel-loader', include: [path.resolve(__dirname, 'src')], options: { presets: ['es2015']}},
      {test: /\.scss$/, loaders: ['css-loader', 'sass-loader'], include: path.resolve(__dirname, 'src')},
      {test: /\.html/, loader: 'html-loader', options: { minimize: true }},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
    ],
  },
  plugins: plugins,
  devServer: {
    contentBase: [
      path.resolve(__dirname, "public"),
      path.resolve(__dirname, "node_modules/clappr/dist"),
    ],
    disableHostCheck: true, // https://github.com/webpack/webpack-dev-server/issues/882
    compress: true,
    host: "0.0.0.0",
    port: 8081
  }
}
