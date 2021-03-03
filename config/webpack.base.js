const path = require('path');
const webpack = require('webpack')
const { getEntryAndPage, getHtml, writeSchemaJS} = require('./fileUtil')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//清理打包
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { entry, pages } = getEntryAndPage('src/pages')


// 生成schema.js 文件

module.exports = {
  entry: {
    ...entry,
    'app':path.resolve(__dirname, '../src/app.js')
  },
  output: {
    filename:'js/[name]-[contenthash:8].js',
    path:path.resolve(__dirname, './../dist')
  },
  resolve:{
    
  }
}