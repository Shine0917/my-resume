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
    extensions:['.js','.jsx'],
    alias: {
      "@": path.resolve(__dirname, '../src')
    },
    modules: [
      "node_modules",
      path.resolve(__dirname,'src')
    ]
  },
  module: {
    rules: [
      {
        test:/\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test:/\.(png|jpg|gif|jpeg)$/,
        loader:'file-loader',
        options: {
          name: '[hash].[ext]',
          outputPath: './img',
          esModule: false
        }
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader?cacheDirectory'
    },
    ]
  },
  plugins:[
    ...pages,
    getHtml('index.html',['app'],'src/index.html','首页-简历自动生成',{pageNames:pages.map(page => page.userOptions.title)}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'css/[name]-[contenthash:8].css',
      chunkFilename:'css/[id]-[contenthash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns:[{from:'public'}]
    }),
    
  ]
}