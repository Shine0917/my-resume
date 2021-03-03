const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode:'production',
  devtool:'source-map',
  plugins:[
    new optimizeCssAssetsWebpackPlugin
  ]
}